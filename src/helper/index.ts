import { GroupedVisit, Log, UniqueViews } from "../interfaces";

/**
 * Sorts logs by the number of views per path.
 *
 * @param {Log[]} logs - An array of log objects containing path and IP address.
 * @returns {UniqueViews} An object where keys are paths and values are the number of views.
 */

function sortByViews(logs: Log[]) : UniqueViews {
  return logs.reduce((acc: UniqueViews, { path }) => {
    if (!acc[path]) {
      acc[path] = 1;
    } else {
      acc[path] += 1;
    }
    return acc;
  }, {});
}

/**
 * Groups logs by IP address and path, counting the number of visits for each combination.
 *
 * @param {Log[]} logs - An array of log objects containing IP address and path.
 * @returns {GroupedVisit[]} An array of objects, each containing an IP address, path, and visit count.
 */

function groupByIpAndPath(logs: Log[]) : GroupedVisit[]{
  return logs.reduce<GroupedVisit[]>((groupedVisit, { ipAddress, path }) => {
    // Check if the current combination of ipAddress and path already exists
    const existingVisit = groupedVisit.find(v => v.ipAddress === ipAddress && v.path === path);

    if (existingVisit) {
      // If it exists, increment the count
      existingVisit.count += 1;
    } else {
      // If it doesn't exist, add a new entry
      groupedVisit.push({ ipAddress, path, count: 1 });
    }

    return groupedVisit;
  }, [])
}

/**
 * Sorts logs by unique views per path, based on grouped visits.
 *
 * This function first groups the logs by IP address and path, then counts the visits
 * for each unique combination. Finally, it sorts the grouped visits by the number of views.
 *
 * @param {Log[]} logs - An array of log objects containing IP address and path.
 * @returns {UniqueViews} An object where keys are paths and values are the number of unique views.
 */

function sortByUniqueViews(logs: Log[])  {
  const groupedVisist = groupByIpAndPath(logs);
  return sortByViews(groupedVisist);
}

export { groupByIpAndPath,  sortByViews, sortByUniqueViews }