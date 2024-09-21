module.exports = class SortOption {
    static getSortOption(option){
        return `<label><input type="checkbox" id="${option}" value="${option}" name="sorting-values"/>${option}</label>`
    }

    stat
}