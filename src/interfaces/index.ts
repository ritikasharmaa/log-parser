interface Log { 
    ipAddress: string,
    path: string,
  }
  interface UniqueViews {
    [key : string]: number
  }
  
  interface GroupedVisit {
    ipAddress: string;
    path: string;
    count: number;
  }
  
  export { Log, UniqueViews , GroupedVisit }