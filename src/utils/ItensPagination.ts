export const ItensPagination = (pageNumber:number, totalPages:number, siblingCount = 2, pageFiller = "...") => {
  // pageNumber = parseInt(pageNumber);
  // totalPages = parseInt(totalPages);
  let pagination_str = "";

  // add first page if current page is not too close
  if ( 1 < pageNumber - siblingCount ) { 
      pagination_str += "1 ";
      if ( siblingCount + 3 < pageNumber ) { pagination_str += (pageFiller + " "); }
      else if ( siblingCount + 2 < pageNumber ) { pagination_str += "2 "; }
  }

  // get siblingCount before
  for ( 
      // is current page to close to first page?
      let ii = (0 < (pageNumber - siblingCount)? pageNumber - siblingCount: 1); 
      ii < (pageNumber); 
      ii++ 
  ) {
      pagination_str += ii + " ";
  }

  // get siblingCount after
  for ( 
      let ii = pageNumber;
      // is end of increment greater than or equal to the total number of pages?
      ii <= ((totalPages >= pageNumber + siblingCount)? (pageNumber + siblingCount): totalPages); 
      ii++ 
  ) {
      pagination_str += ii + " ";
  }

  // add last page if current page is not too close
  if ( totalPages > pageNumber + siblingCount ) { 
      if ( totalPages - siblingCount - 2 > pageNumber ) { pagination_str += (pageFiller + " "); }
      else if ( totalPages - siblingCount - 1 > pageNumber ) { pagination_str += (totalPages - 1) + " "; }
      pagination_str += totalPages; 
  }
  
  let ReturnArray = pagination_str.split(' ');
  return ReturnArray;
};