let percentiles = {
    // binary search to find index of the largest number less than num in plist 
    indexOfLargestLessThanNum(num, plist) {
        let left = 0;
        let right = plist.length - 1;
        let largestIndex = -1;
        
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (plist[mid] <= num) {
                largestIndex = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // shift to left
        while (largestIndex > 0 && plist[largestIndex - 1] === plist[largestIndex]) largestIndex--;
        
        return largestIndex;
    },
    calculatePercentiles(num, plist) {
        let index = this.indexOfLargestLessThanNum(num, plist);
        return 99 - index;
    }
}

module.exports = percentiles;