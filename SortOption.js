module.exports = class SortOption {
    static getSortOption(option){
        return `<label><input type="checkbox" id="${option}" value="${option}" name="sorting-values"/>${option}</label>`
    }

    /**
     * @param {string[]} options 
     * @returns {string} 
     */
    static getSortOptions(options){
        let sortValues = '';
        options.forEach((option) =>{
            sortValues += this.getSortOption(option);
        })
        return sortValues;
    }
}