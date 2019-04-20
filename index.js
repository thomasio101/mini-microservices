const serviceConfigs = require('./services.json')
const serviceRegistry = {}

function startService(service) {
    const serviceConfig = serviceConfigs[service]

    if (serviceConfig.hasOwnProperty('dependencies'))
        for (const dependency of serviceConfig.dependencies)
            if (!serviceRegistry.hasOwnProperty(dependency))
                startService(dependency)

    serviceRegistry[service] = require(serviceConfig.path)(serviceRegistry)
}

for (const service in serviceConfigs)
    if (serviceConfigs.hasOwnProperty(service) && !serviceRegistry.hasOwnProperty(service))
        startService(service)

require('./procedures.js')(serviceRegistry)