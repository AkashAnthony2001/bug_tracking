const storeKey = "bug-tracker"
export const store = (key,value)=>{
    if(key && window.localStorage && value){
        let storeValue = localStorage.getItem(storeKey)
        if(!storeValue){
            let values  = {[key]:value}
            localStorage.setItem(storeKey,JSON.stringify(values))
        }else{
            storeValue = JSON.parse(storeValue)
            storeValue[key] = value
            localStorage.setItem(storeKey,JSON.stringify(storeValue))            
        }
    }
}
export const getStoreValue = (key)=>{
    if(key && window.localStorage){
        let storeValue = localStorage.getItem(storeKey)
        if(storeValue){ 
            storeValue = JSON.parse(storeValue)
            storeValue = storeValue[key]
            if(!storeValue)return ""
        }else{
            return ""
        }
        return storeValue
    }
}

export const removeStoreValue = ()=>{
    localStorage.removeItem(storeKey)
}

export const constants = {
    USERS:'users',
    TYPES:'types',
    PROJECTS:'projects',
    STATUS:'status',
    SPRINT:'sprints',
    CURRENT_SPRINT:'currentSprint'
}