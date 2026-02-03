# Yearly Carousel Navigation Feature

## Overview
The yearly carousel navigation allows users to view and manage data for different years separately. Each year's data is stored in separate Firebase collections, ensuring complete data isolation between years.

## Features

### 1. Year Navigation
- **Carousel Interface**: Navigate between years using left/right arrow buttons in the header
- **Current Year Display**: Shows the currently selected year prominently
- **Visual Feedback**: Buttons provide hover effects and visual indicators

### 2. Data Separation
- **Year-based Collections**: Data is stored in separate Firestore collections per year
  - Orders: `orders_2025`, `orders_2024`, etc.
  - Expenses: `expenses_2025`, `expenses_2024`, etc.
- **Automatic Collection Creation**: New year collections are created automatically when data is added
- **Independent Statistics**: All statistics, charts, and reports are calculated per year

### 3. Smart Year Discovery
- **Automatic Detection**: System automatically discovers years with existing data
- **Range Coverage**: Checks current year ± 10 years plus 2 future years
- **Fallback Handling**: Gracefully handles missing data with appropriate fallbacks

## How It Works

### Navigation Logic
1. **Initial Load**: Starts with current year (2025)
2. **Year Discovery**: Scans for existing data across multiple years
3. **Navigation**: Users can move forward/backward through available years
4. **Data Loading**: Switching years triggers fresh data loading for that year

### Data Storage Structure
```
artifacts/
  └── {appId}/
      └── public/
          └── data/
              ├── orders_2025/     # 2025 orders
              ├── orders_2024/     # 2024 orders
              ├── expenses_2025/   # 2025 expenses
              ├── expenses_2024/   # 2024 expenses
              ├── services_2025/   # 2025 services
              ├── services_2024/   # 2024 services
              ├── inventory_2025/  # 2025 inventory
              └── inventory_2024/  # 2024 inventory
```

### Context-Aware Statistics
When viewing a different year:
- **"Today"** refers to the equivalent date in that year
- **"This Month"** refers to the current month in that year
- **"This Week"** refers to the current week in that year
- **Charts and graphs** show data relative to the selected year

## User Interface

### Header Navigation
```
[<] 📅 2025 [>]
```
- Left arrow: Go to previous year
- Calendar icon + year: Current year display
- Right arrow: Go to next year

### Visual Indicators
- **Button States**: Disabled appearance when no more years available
- **Loading States**: Shows loading indicator when switching years
- **Toast Notifications**: Confirms successful year switches

## Technical Implementation

### Key Functions
- `initializeYearManagement()`: Sets up year navigation system
- `discoverAvailableYears()`: Finds years with existing data
- `changeYear(delta)`: Handles year navigation
- `updateYearNavigation()`: Updates button states
- `getOrdersCollectionRef(year)`: Returns year-specific collection reference
- `getExpensesCollectionRef(year)`: Returns year-specific expense collection

### State Management
- `selectedYear`: Currently active year
- `availableYears`: Array of years with data
- Year-aware data loading and statistics calculation

## Benefits

1. **Data Organization**: Clean separation of yearly data
2. **Performance**: Only loads data for the selected year
3. **Scalability**: Handles multiple years of historical data efficiently
4. **User Experience**: Intuitive navigation between time periods
5. **Data Integrity**: Prevents accidental mixing of data across years

## Usage Examples

### Viewing Historical Data
1. Click left arrow to go to previous years
2. View 2024 data separately from 2025 data
3. All statistics and charts update to show year-specific data

### Adding Data to Specific Years
1. Navigate to desired year
2. Add orders/expenses normally
3. Data is automatically saved to that year's collections

### Year-over-Year Comparisons
1. Note statistics for current year
2. Navigate to previous year
3. Compare the same metrics across different years

## Future Enhancements

Potential improvements could include:
- Year-over-year comparison charts
- Bulk data migration between years
- Year-end closing procedures
- Multi-year reporting views
- Data archiving for old years

## Migration Notes

Existing data in the original `orders` and `expenses` collections will need to be migrated to year-specific collections. The system automatically creates new year collections as needed for new data.