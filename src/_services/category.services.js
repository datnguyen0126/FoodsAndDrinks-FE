import axios from 'axios';

export const categoryService = {
    getAll,
    getResults,
};

let url = process.env.VUE_APP_DJANGO_HOST;

function getAll() {
    return axios
        .get(`${url}/foods/categories/`)
        .then(handleResponse)
}

function getResults() {
    return axios
        .get(`${url}/foods/categories/`)
}

function handleResponse(response) {
    let data = response.data
    data.map(item => {
        item['addLeafNodeDisabled'] = true
        item['addTreeNodeDisabled'] = true
        item['editNodeDisabled'] = true
        item['delNodeDisabled'] = true
    })
    let listParent = [
        {
            id: 0,
            name: 'All',
            addLeafNodeDisabled: true,
            addTreeNodeDisabled: true,
            editNodeDisabled: true,
            delNodeDisabled: true,
        }
    ]
    data = data.filter(item => {
        if (!item.parent_id) {
            listParent.push(item)
        }
        return item.parent_id
    })
    listParent.map(parent => {
        return getChildren(parent, data)
    })
    return listParent;
}

function getChildren(parent, list) {
    let children = []
    list.map(cat => {
        if (parent.id === cat.parent_id)
            children.push(getChildren(cat, list))
    })
    if (children.length > 0) parent['children'] = children
    return parent
}
