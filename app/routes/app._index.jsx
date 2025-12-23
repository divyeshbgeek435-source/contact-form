
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Text,
  Icon,
  Spinner,
  BlockStack,
  InlineGrid,
  Box,
  Divider,
  Badge,
  Button,
  ButtonGroup,
  Popover,
  ActionList,
  Banner,
  InlineStack,

} from "@shopify/polaris";
import {
  DataPresentationIcon,    // ✅ Updated
  CalendarCheckIcon,       // ✅ Updated
  ClockIcon,               // ✅ Updated
  ArrowLeftIcon,           // ✅ Updated
  ArrowRightIcon,          // ✅ Updated
  FormsIcon,                // ✅ Updated
  CalculatorIcon,              // ✅ Updated
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ---------------- LOADER ---------------- */
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const response = await admin.graphql(`
    {
      shop {
        id
        name
        email
      }
    }
  `);
  const json = await response.json();
  const shopGid = json.data.shop.id;
  const shopId = shopGid.split("/").pop();
  const shopName = json.data.shop.name;
  return { shopId, shopGid, shopName };
};

/* ---------------- HELPER FUNCTIONS ---------------- */
const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  return `${day}`;
};

const getMonthName = (monthIndex) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthIndex];
};

const groupByMonth = (data) => {
  const monthMap = {};

  data.forEach((item) => {
    const date = new Date(item.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    if (!monthMap[monthKey]) {
      monthMap[monthKey] = {
        month: monthName,
        monthKey: monthKey,
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
        totalForms: 0,
        days: 0,
        dailyData: [],
      };
    }

    monthMap[monthKey].totalForms += item.totalForms;
    monthMap[monthKey].days += 1;
    monthMap[monthKey].dailyData.push({
      ...item,
      displayDate: formatDateForDisplay(item.date),
      originalDate: item.date,
    });
  });

  // Sort months in descending order (newest first)
  return Object.values(monthMap)
    .map((month) => ({
      ...month,
      avgPerDay: (month.totalForms / month.days).toFixed(1),
      dailyData: month.dailyData.sort(
        (a, b) => new Date(a.originalDate) - new Date(b.originalDate)
      ),
    }))
    .sort((a, b) => b.monthKey.localeCompare(a.monthKey));
};

const getAvailableYears = (monthlyData) => {
  const years = new Set();
  monthlyData.forEach(month => {
    years.add(month.year);
  });
  return Array.from(years).sort((a, b) => b - a);
};

const getMonthsForYear = (monthlyData, year) => {
  return monthlyData
    .filter(month => month.year === year)
    .map(month => ({
      monthIndex: month.monthIndex,
      monthName: getMonthName(month.monthIndex),
      monthKey: month.monthKey,
    }))
    .sort((a, b) => b.monthIndex - a.monthIndex);
};

/* ---------------- CUSTOM TOOLTIP ---------------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "12px 16px",
          border: "1px solid #e1e3e5",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            color: "#202223",
            fontSize: "13px",
          }}
        >
          Date: {label}
        </p>
        <p
          style={{
            margin: "6px 0 0 0",
            color: "#008060",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          {payload[0].value} submissions
        </p>
      </div>
    );
  }
  return null;
};

/* ---------------- STATS CARD COMPONENT ---------------- */
const StatsCard = ({ title, value, subtitle, icon, tone }) => (
  <Card>
    <Box padding="400">
      <BlockStack gap="300">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {icon && (
            <div style={{ margin: "0px" }}>
              <Icon source={icon} tone="base" />
            </div>
          )}

          <Text variant="headingMd" as="h3" tone="subdued">
            {title}
          </Text>
        </div>
        <Text variant="heading2xl" as="p" fontWeight="bold">
          {value}
        </Text>
        {subtitle && (
          <Text variant="bodySm" as="p" tone="subdued">
            {subtitle}
          </Text>
        )}
      </BlockStack>
    </Box>
  </Card>
);

/* ---------------- DATE PICKER COMPONENT (MONTH & YEAR ONLY) ---------------- */
const DatePickerPopover = ({
  monthlyData,
  currentMonth,
  onSelectMonth
}) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [yearPopoverActive, setYearPopoverActive] = useState(false);
  const [monthPopoverActive, setMonthPopoverActive] = useState(false);

  const [selectedYear, setSelectedYear] = useState(currentMonth?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth?.monthIndex || new Date().getMonth());

  const availableYears = getAvailableYears(monthlyData);
  const availableMonths = getMonthsForYear(monthlyData, selectedYear);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  // ✅ CLOSE ALL NESTED POPOVERS WHEN MAIN POPOVER CLOSES
  const handleMainPopoverClose = useCallback(() => {
    setPopoverActive(false);
    setYearPopoverActive(false);
    setMonthPopoverActive(false);
  }, []);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearPopoverActive(false);

    // Update month if current month not available in new year
    const monthsInYear = getMonthsForYear(monthlyData, year);
    if (!monthsInYear.find(m => m.monthIndex === selectedMonth)) {
      const firstMonth = monthsInYear[0];
      if (firstMonth) {
        setSelectedMonth(firstMonth.monthIndex);
        // Auto-select the first available month
        const monthData = monthlyData.find(m => m.monthKey === firstMonth.monthKey);
        if (monthData) {
          onSelectMonth(monthData);
          handleMainPopoverClose();
        }
      }
    }
  };

  const handleMonthSelect = (monthIndex, monthKey) => {
    setSelectedMonth(monthIndex);
    setMonthPopoverActive(false);

    // Find and select the month
    const monthData = monthlyData.find(m => m.monthKey === monthKey);
    if (monthData) {
      onSelectMonth(monthData);
      handleMainPopoverClose();
    }
  };

  const activator = (
    <Button
      onClick={togglePopoverActive}
      disclosure={popoverActive ? 'up' : 'down'}
      icon={CalendarCheckIcon}
    >
      {currentMonth?.month || 'Select Month'}
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={handleMainPopoverClose}
      ariaHaspopup={false}
      sectioned
    >
      <Box padding="400">
        <BlockStack gap="300">
          <Text variant="headingMd" as="h3" alignment="center">
            Select Month & Year
          </Text>
          <Divider />

          {/* Year and Month Selectors */}
          <BlockStack gap="200">
            <BlockStack gap="100">
              <Text variant="bodySm" as="p" tone="subdued">
                Year
              </Text>
              <Popover
                active={yearPopoverActive}
                activator={
                  <Button
                    onClick={() => setYearPopoverActive(!yearPopoverActive)}
                    disclosure
                    fullWidth
                    size="large"
                  >
                    {selectedYear}
                  </Button>
                }
                onClose={() => setYearPopoverActive(false)}
              >
                <ActionList
                  items={availableYears.map(year => ({
                    content: year.toString(),
                    onAction: () => handleYearSelect(year),
                  }))}
                />
              </Popover>
            </BlockStack>

            <BlockStack gap="100">
              <Text variant="bodySm" as="p" tone="subdued">
                Month
              </Text>
              <Popover
                active={monthPopoverActive}
                activator={
                  <Button
                    onClick={() => setMonthPopoverActive(!monthPopoverActive)}
                    disclosure
                    fullWidth
                    size="large"
                  >
                    {getMonthName(selectedMonth)}
                  </Button>
                }
                onClose={() => setMonthPopoverActive(false)}
              >
                <ActionList
                  items={availableMonths.map(month => ({
                    content: month.monthName,
                    onAction: () => handleMonthSelect(month.monthIndex, month.monthKey),
                  }))}
                />
              </Popover>
            </BlockStack>
          </BlockStack>
        </BlockStack>
      </Box>
    </Popover>
  );
};

/* ---------------- PAGE ---------------- */
export default function Index({ loaderData }) {
   
  if (!loaderData) {
    return null;
  }
 

  const { shopId, shopGid, shopName } = loaderData || {};
  const [stats, setStats] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [showLimitAlert, setShowLimitAlert] = useState(false);

  // ✅ ALL HOOKS AT THE TOP
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!shopId) return;
    fetch(`http://localhost:5000/api/pipeline/contacts/${shopId}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, [shopId]);

  useEffect(() => {
    if (!stats) return;

    const monthlyData = groupByMonth(stats.graphData || []);
    const currentMonth = monthlyData[currentMonthIndex];

    if (currentMonth && currentMonth.days > 31) {
      setShowLimitAlert(true);
    } else {
      setShowLimitAlert(false);
    }
  }, [stats, currentMonthIndex]);

  // ✅ EARLY RETURN AFTER ALL HOOKS
  if (!stats || !isClient) {
    return (
      <Page>
        <Box paddingBlockStart="1600" paddingBlockEnd="1600">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <BlockStack gap="400" align="center">
              <Spinner accessibilityLabel="Loading analytics" size="large" />
              <Text variant="bodyLg" tone="subdued">
                Loading your analytics...
              </Text>
            </BlockStack>
          </div>
        </Box>
      </Page>
    );
  }

  // Group data by months
  const monthlyData = groupByMonth(stats.graphData || []);
  const totalMonths = monthlyData.length;

  // Get current month data
  const currentMonth = monthlyData[currentMonthIndex];
  const currentMonthDailyData = currentMonth?.dailyData || [];

  // Navigation handlers
  const handlePreviousMonth = () => {
    if (currentMonthIndex < monthlyData.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleSelectMonth = (monthData) => {
    const index = monthlyData.findIndex(m => m.monthKey === monthData.monthKey);
    if (index !== -1) {
      setCurrentMonthIndex(index);
    }
  };

  const hasPreviousMonth = currentMonthIndex < monthlyData.length - 1;
  const hasNextMonth = currentMonthIndex > 0;

  // Calculate overall stats
  const avgDaily = stats.graphData?.length
    ? (stats.totalForms / stats.graphData.length).toFixed(1)
    : 0;

  const maxDaily = stats.graphData?.length
    ? Math.max(...stats.graphData.map((d) => d.totalForms))
    : 0;

  return (
    <Page

    >
      <Box
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          backgroundColor: "#ffffff",
          border: "1px solid #e1e3e5",
          boxShadow: "0 2px 4px rgba(0,0,0,0.08)",

        }}
        paddingBlockEnd="400">
        <InlineStack align="space-between">
          <InlineStack gap="100" align="center">
            <Icon source={DataPresentationIcon} tone="base" />
            <Text variant="headingLg">Contact Forms Analytics</Text>
          </InlineStack>

          <BlockStack align="end">
            <div

            >
              <Text tone="base">
                Total Days Tracked : {" "}
                <Text as="span" fontWeight="semibold" tone="base">
                  {stats.graphData?.length || 0}
                </Text>
              </Text>
            </div>
          </BlockStack>

        </InlineStack>
      </Box>


      <BlockStack gap="500">
        {/* ONE MONTH LIMIT ALERT */}
        {showLimitAlert && (
          <Banner
            title="Data Limit Notice"
            tone="warning"
            onDismiss={() => setShowLimitAlert(false)}
          >
            <p>
              This view is optimized for one month of data. Currently showing {currentMonth?.days} days.
              Use the date picker to view specific months for better visualization.
            </p>
          </Banner>
        )}

        {/* OVERALL STATS */}
        <InlineGrid columns={{ xs: 1, sm: 2, md: 4 }} gap="400">
          <StatsCard
            title="Total Submissions"
            value={stats.totalForms.toLocaleString()}
            subtitle="All-time total"
            icon={FormsIcon}
          />
          <StatsCard
            title="Daily Average"
            value={avgDaily}
            subtitle="Across all days"
            icon={ClockIcon}

          />
          <StatsCard
            title="Total Months"
            value={totalMonths}
            subtitle="Months tracked"
            icon={CalendarCheckIcon}
          />
          <StatsCard
            title="Peak Day"
            value={maxDaily}
            subtitle="Highest submissions"
            icon={CalculatorIcon}
          />
        </InlineGrid>

        {/* CURRENT MONTH - BAR CHART */}
        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              {/* Header with Navigation and Date Picker */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <BlockStack gap="200">

                  <Text variant="heading2xl" as="h2">
                    {currentMonth?.month || "Monthly View"}
                  </Text>
                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    <Badge tone="success">
                      {currentMonth?.totalForms || 0} total submissions
                    </Badge>
                    <Badge tone="info">
                      {currentMonth?.avgPerDay || 0} avg per day
                    </Badge>
                    <Badge>
                      {currentMonth?.days || 0} days
                    </Badge>
                  </div>
                </BlockStack>

                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <ButtonGroup variant="segmented">
                    <Button
                      icon={ArrowLeftIcon}
                      onClick={handlePreviousMonth}
                      disabled={!hasPreviousMonth}
                    >
                      Previous
                    </Button>
                    <Button
                      icon={ArrowRightIcon}
                      onClick={handleNextMonth}
                      disabled={!hasNextMonth}
                    >
                      Next
                    </Button>
                  </ButtonGroup>

                  <DatePickerPopover
                    monthlyData={monthlyData}
                    currentMonth={currentMonth}
                    onSelectMonth={handleSelectMonth}
                  />
                </div>
              </div>

              <Divider />

              {/* Bar Chart - ✅ REMOVED FOCUS OUTLINE */}
              <div
                style={{
                  width: "100%",
                  height: "420px",
                  marginTop: "8px",
                  outline: "none", // Remove focus outline
                }}
                tabIndex={-1} // Remove from tab order
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={currentMonthDailyData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e1e3e5" vertical={false} />
                    <XAxis
                      dataKey="displayDate"
                      tick={{ fontSize: 10, fill: "#6d7175", fontWeight: 500 }}
                      stroke="#c9cccf"
                      angle={0}
                      textAnchor="middle"
                      height={50}
                      interval={0}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: "#6d7175" }}
                      stroke="#c9cccf"
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 128, 96, 0.1)' }} />
                    <Bar
                      dataKey="totalForms"
                      fill="#008060"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Month Counter */}
              <Box paddingBlockStart="300">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <Text variant="bodySm" tone="subdued" alignment="center">
                    Viewing month {currentMonthIndex + 1} of {totalMonths}
                  </Text>
                  {hasNextMonth && (
                    <Text variant="bodySm" tone="subdued">
                      • Next: {monthlyData[currentMonthIndex - 1]?.month}
                    </Text>
                  )}
                  {hasPreviousMonth && (
                    <Text variant="bodySm" tone="subdued">
                      • Previous: {monthlyData[currentMonthIndex + 1]?.month}
                    </Text>
                  )}
                </div>
              </Box>
            </BlockStack>
          </Box>
        </Card>


      </BlockStack>
    </Page>
  );
}

/* ---------------- HEADERS ---------------- */
export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};