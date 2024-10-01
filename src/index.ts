import { readFileSync } from "fs";
import { sortByViews, sortByUniqueViews } from "./helper";
import { Log } from "./interfaces";

const logs : Log[] = []

export default function parser(){
  try {
    console.log("Parsing")
    const logData = readFileSync('./web.log', 'utf8');
    if(logData){
      const logArray = logData.split("\n");
      logArray.forEach((line: string)=>{
        const [path, ipAddress] = line.split(' ');
        logs.push({ ipAddress, path });
      })
      // Sort by views
      const list = sortByViews(logs)
      console.log("Sorted by views", list)
      // Sort by unique views
      const list2 = sortByUniqueViews(logs)
      console.log("Sorted by unique views", list2)
    }
  } catch (e){
    console.error(e)
  }
}
// Calling parser
parser()


// Another method (not fully compatiable with typescript)
const readline = require('linebyline');
function parseLog(){
  const  rl = readline('./file.log');
  rl.on('line', function(line: string) {
    if(line){
      const [path, ipAddress] = line.split(' ');
      logs.push({ ipAddress, path });
    }
  })
  .on('error', function(e : Error) {
    console.log(e)
  })
  .on('end',function(){
    console.log(logs)
    const list = sortByViews(logs)
    const list2 = sortByUniqueViews(logs)
    console.log(list)
    console.log(list2)
  })
}