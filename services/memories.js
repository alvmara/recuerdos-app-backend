const Memory = require('../models/memory');

async function findBy (params) {
    return Memory.find(params);
}

async function listMemories(config) {
    const skip = (config.page - 1) * config.limit;

    return Memory.find().limit(config.limit).skip(skip).sort({ order: 'DESC' });
}


async function createMemory(memory) {
    return await Memory.create(memory);
}

async function updateMemory(id, memory) {
    return Memory.updateOne({ _id: id }, memory);
}

function search({ searchText, page }) {
    const findOptions = {
        title: new RegExp(searchText),
        desciption: new RegExp(searchText)
    };

    const skip = (page - 1) * 50;

    return Memory.find(findOptions).limit(50).skip(skip).sort({ date: 'DESC' });
}

module.exports = {
    findBy,
    listMemories,
    createMemory,
    updateMemory,
    search
};

