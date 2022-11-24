This will be a money tracking app. Lots of plans to come...

# Project File Structure

- /api -> PHP API files
- /api/model -> PHP classes to access DB
- /api/controller.php -> API controller class

- /src -> React Files
- /src/assets -> static css/image files
- /src/components -> React components
- /src/model -> JS functions that call fetch API data
- /src/utils -> helper functions and custom hooks
- /src/views -> App pages

# TODO
- make all API returns ASSOC ARRAYS for consistency. Some are objects
- Change ViewBudgets and ViewTransactions as ListBudgets and ListTransactions
- "" make headings separate components
- "" simplify props passed thru. Call custom hooks where needed instead of passing thru

# Bugs
- When a budget is renamed to and existing budget, it combines them. Need to prevent this