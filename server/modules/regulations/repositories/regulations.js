const {
    regulationsMock,
    normasEmpresaRepositorio
} = require('../mockGedWebApi/mock');

function getGedWebRepository(filter) {
    return new Promise((res, rej) => {
        setTimeout(() => {

            if (filter.s) {
                const filteredRegulations = regulationsMock.filter(regulation => {
                    return (
                        regulation.nome.indexOf(filter.s) !== -1
                        || regulation.categoria.indexOf(filter.s) !== -1
                        || regulation.descricao.indexOf(filter.s) !== -1
                    )
                })

                return res(filteredRegulations)
            }

            res(regulationsMock)
        }, 1500)
    })
}

function getRegulations(filter) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (filter.s) {
                const filteredRegulations = normasEmpresaRepositorio.filter(regulation => {
                    return (
                        regulation.nome.toLocaleLowerCase().indexOf(filter.s.toLocaleLowerCase()) !== -1
                        || regulation.categoria.toLocaleLowerCase().indexOf(filter.s.toLocaleLowerCase()) !== -1
                        || regulation.descricao.toLocaleLowerCase().indexOf(filter.s.toLocaleLowerCase()) !== -1
                    )
                })

                return res(filteredRegulations)
            }

            res(normasEmpresaRepositorio)
        }, 1500)
    })
}

function createRegulations(regulation) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const regulationToCreate = regulationsMock.find(rglt => rglt.nome === regulation.nome);
            normasEmpresaRepositorio.push(regulationToCreate);
            res(regulationToCreate)
        }, 1500)
    })
}

module.exports = {
    getGedWebRepository,
    getRegulations,
    createRegulations
}