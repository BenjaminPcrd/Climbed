import AsyncStorage from '@react-native-async-storage/async-storage'

const getSessions = () => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            newSessions = JSON.parse(jsonSessions)
        } else {
            newSessions = []
        }
        resolve(newSessions)
    } catch(e) {
        reject(e)
    }
})

const deleteSession = (sessionToDelete) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const oldSessions = JSON.parse(jsonSessions)
            newSessions = oldSessions
            newSessions.splice(oldSessions.findIndex(s => s.id === sessionToDelete.id), 1)
        } else {
            newSessions = []
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        resolve()
    } catch(e) {
        reject(e)
    }
})

const editSession = (sessionToEdit) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const oldSessions = JSON.parse(jsonSessions)
            newSessions = oldSessions
            newSessions[oldSessions.findIndex(s => s.id === sessionToEdit.id)] = sessionToEdit

        } else {
            newSessions = [sessionToEdit]
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        resolve()
    } catch(e) {
        reject(e)
    }
})

const addSession = (sessionToAdd) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const sessions = JSON.parse(jsonSessions)
            newSessions = [sessionToAdd, ...sessions]
        } else {
            newSessions = [sessionToAdd]
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        resolve()
    } catch(e) {
        reject(e)
    }
})

const deleteClimb = (climbToDelete, session) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const oldSessions = JSON.parse(jsonSessions)
            newSessions = oldSessions
            let index = oldSessions.find(s => s.id === session.id).climbs.findIndex(c => c.index === climbToDelete.index)
            newSessions.find(s => s.id === session.id).climbs.splice(index, 1)
        } else {
            newSessions = []
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        let newSession = newSessions.find(s => s.id === session.id)
        resolve(newSession)
    } catch(e) {
        reject(e)
    }
})

const editClimb = (climbToEdit, session) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const oldSessions = JSON.parse(jsonSessions)
            newSessions = oldSessions
            let sessionIndex = oldSessions.findIndex(s => s.id === session.id)
            let climbToEditIndex = oldSessions[sessionIndex].climbs.findIndex(c => c.index === climbToEdit.index)
            newSessions[sessionIndex].climbs[climbToEditIndex] = climbToEdit
        } else {
            newSessions = []
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        let newSession = newSessions.find(s => s.id === session.id)
        resolve(newSession)
    } catch(e) {
        reject(e)
    }
})

const addClimb = (climbToAdd, session) => new Promise(async(resolve, reject) => {
    try {
        const jsonSessions = await AsyncStorage.getItem('@sessions')
        let newSessions
        if (jsonSessions != null) {
            const oldSessions = JSON.parse(jsonSessions)
            newSessions = oldSessions
            newSessions.find(s => s.id === session.id).climbs.push(climbToAdd)
        } else {
            newSessions = []
        }
        await AsyncStorage.setItem('@sessions', JSON.stringify(newSessions))
        let newSession = newSessions.find(s => s.id === session.id)
        resolve(newSession)
    } catch(e) {
        reject(e)
    }
})

export {
    getSessions,
    deleteSession,
    editSession,
    addSession,

    deleteClimb,
    editClimb,
    addClimb
}