# Log Parser

## Description
The Log Parser is a TypeScript-based utility designed to parse web server log files, extracting valuable insights such as the number of views per path and unique views per IP address.

## Features
- Parses log entries from a specified log file (`web.log`).
- Sorts the data by total views and unique views.
- Can also parse logs using a line-by-line reading method.(extra method using linebyline package)

## Prerequisites
- Node.js (v14 or higher)
- npm (Node package manager)

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ritikasharmaa/log-parser.git
   ```
 2. **Navigate to the project directory:**
    ```bash
    cd log-parser
    ```
3 **Install the required dependencies:**
    ```
    npm install
    ```


### Example
To execute the parser, run the following command:

```bash
npm run start
```
### Run the test cases using Jest:
```bash
npm test
```
