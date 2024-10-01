
import parser from '../index';
import { sortByViews, sortByUniqueViews } from '../helper';
import fs from 'fs';

jest.mock('fs');
jest.mock('../helper');

describe('parser function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse logs and sort by views and unique views', () => {
    const mockLogData = 'path1 192.168.1.1\npath2 192.168.1.2\npath1 192.168.1.3';
    (fs.readFileSync as jest.Mock).mockReturnValue(mockLogData);
  
    const mockSortedByViews = [
      { path: 'path1', ipAddress: '192.168.1.1' },
      { path: 'path1', ipAddress: '192.168.1.3' },
      { path: 'path2', ipAddress: '192.168.1.2' },
    ];
  
    const mockSortedByUniqueViews = [
      { path: 'path1', ipAddress: '192.168.1.1' },
      { path: 'path2', ipAddress: '192.168.1.2' },
    ];
  
    (sortByViews as jest.Mock).mockReturnValue(mockSortedByViews);
    (sortByUniqueViews as jest.Mock).mockReturnValue(mockSortedByUniqueViews);
  
    console.log = jest.fn(); 
  
    parser();
  
    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith('./web.log', 'utf8');
    expect(sortByViews).toHaveBeenCalledWith(expect.any(Array));
    expect(sortByUniqueViews).toHaveBeenCalledWith(expect.any(Array));
  
    // Checking console.log calls
    expect(console.log).toHaveBeenNthCalledWith(1, 'Parsing');
    expect(console.log).toHaveBeenNthCalledWith(2, 'Sorted by views', mockSortedByViews);
    expect(console.log).toHaveBeenNthCalledWith(3, 'Sorted by unique views', mockSortedByUniqueViews);
  });
  

  it('should handle file read errors', () => {
    // Simulate an error during file reading
    const mockError = new Error('File not found');
    (fs.readFileSync as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    console.error = jest.fn();

    // Call the parser function
    parser();

    // Assert that the error was logged
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
