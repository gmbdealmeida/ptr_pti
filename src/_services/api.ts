// Axios requests go here
import axios, { AxiosRequestConfig } from "axios";

const dev = "http://localhost:8000";
const web = "https://api.uhomefcul.tech";

let config: AxiosRequestConfig = {
    baseURL: web,
    timeout: 30000,
    responseType: "json",
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5,
}

//USER
//MICROSERVICE
//FUNCTIONS
export const Login = (email: string, password: string) => {
    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    return axios.post("/api/login", formData, config)
}

export const SignUp = (username: string, email: string, password: string) => {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("email", email)
    formData.append("password", password)
    return axios.post("/api/register", formData, config)
}

export const SignInWithGoogle = (googleid: string, username: string, email: string) => {
    const formData = new FormData()
    formData.append("googleId", googleid)
    formData.append("username", username)
    formData.append("email", email)
    return axios.post("/api/googleSignIn", formData, config)
}

export const GetProfile = () => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get("/api/profile", config)
}

export const UpdateUser = (

    accountType?: string, name?: string, birthDate?: string,
    address?: string, bankAccountNumber?: string, cellphoneNumber?: string,
    avatar?: string, gender?: string, password?: string
) => {
    const formData = new FormData()
    
    accountType && formData.append("accountType", accountType)
    name && formData.append("name", name)
    address && formData.append("address", address)
    birthDate && formData.append("birthDate", birthDate)
    bankAccountNumber && formData.append("bankAccountNumber", bankAccountNumber)
    cellphoneNumber && formData.append("cellphoneNumber", cellphoneNumber)
    avatar && formData.append("avatar", avatar)
    password && formData.append("password", password)
    gender && formData.append("gender", gender)

    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.post("/api/updateUser", formData, config)
}

export const CheckToken = () => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    config.data = {}
    return axios.get("/api/checkToken", config)
}

export const GetUserById = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    config.data = {}
    return axios.get("/api/users/" + id, config)
}

export const GetAllUsers = () =>{
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    
    return axios.get("/api/users", config)
}

//CHAT
//MICROSERVICE
//FUNCTIONS
export const SendMessage = (idReceiver: string, message: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    formData.append("idReceiver", idReceiver)
    formData.append("message", message)

    return axios.post("/api/SendMessage", formData, config)
}

export const GetMessages = (userId: string, idReceiver: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("idReceiver", idReceiver)

    return axios.post("/api/GetMessages", formData, config)
}

export const GetActiveChats = () => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    config.data = {}
    return axios.get("/api/GetActiveChats", config)
}

//HOUSE
//MICROSERVICE
//FUNCTIONS
export const AddHouse = (
    title: string, address: string, location: string, 
    coordinates: string, rent: string, maxPeopleNum: string,
    roomsNum: string, area: string, houseType: string, spaceType: string, 
    commodities: string, installations: string, description: string, 
    houseRules: string, dateAvailable: string, pictures: string
) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("address", address)
    formData.append("location", location)
    formData.append("coordinates", coordinates)
    formData.append("rent", rent)
    formData.append("maxPeopleNum", maxPeopleNum)
    formData.append("roomsNum", roomsNum)
    formData.append("area", area)
    formData.append("houseType", houseType)
    formData.append("spaceType", spaceType)
    formData.append("commodities", commodities)
    formData.append("installations", installations)
    formData.append("description", description)
    formData.append("houseRules", houseRules)
    formData.append("dateAvailable", dateAvailable)
    formData.append("pictures", pictures)

    return axios.post("/api/addHouse", formData, config)
}

export const GetAllHouses = () => {

    return axios.get("/api/getAllHouses", config)
}

export const GetHouseById = (id: string) => {

    return axios.get("/api/getHouseById/" + id, config)
}

export const UpdateHouse = (
    houseId: string,
    address?: string, location?: string, coordinates?: string,
    rent?: string, maxPeopleNum?: string, roomsNum?: string,
    area?: string, houseType?: string, spaceType?: string,
    description?: string, houseRules?: string, dateAvailable?: string
) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    console.log(location)
    formData.append("houseId", houseId)
    address && formData.append("address", address)
    // location && formData.append("location", location)
    formData.append("location", location as string)
    coordinates && formData.append("coordinates", coordinates)
    rent && formData.append("rent", rent)
    maxPeopleNum && formData.append("maxPeopleNum", maxPeopleNum)
    roomsNum && formData.append("roomsNum", roomsNum)
    area && formData.append("area", area)
    houseType && formData.append("houseType", houseType)
    spaceType && formData.append("spaceType", spaceType)
    description && formData.append("description", description)
    houseRules && formData.append("houseRules", houseRules)
    dateAvailable && formData.append("dateAvailable", dateAvailable)
    
    console.log(formData)
    return axios.post("/api/updateHouse", formData, config)
}

export const DeleteHouseById = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get("/api/deleteHouseById/" + id, config)
}

export const GetHousesWithFilter = (
    address?: string, location?: string, coordinates?: string,
    rent?: string, maxPeopleNum?: string, roomsNum?: string,
    area?: string, houseType?: string, spaceType?: string,
    description?: string, houseRules?: string, dateAvailable?: string,
    commodities?: string, installations?: string
) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    address && formData.append("address", address)
    location && formData.append("location", location)
    coordinates && formData.append("coordinates", coordinates)
    rent && formData.append("rent", rent)
    maxPeopleNum && formData.append("maxPeopleNum", maxPeopleNum)
    roomsNum && formData.append("roomsNum", roomsNum)
    area && formData.append("area", area)
    houseType && formData.append("houseType", houseType)
    spaceType && formData.append("spaceType", spaceType)
    description && formData.append("description", description)
    houseRules && formData.append("houseRules", houseRules)
    dateAvailable && formData.append("dateAvailable", dateAvailable)
    commodities && formData.append("commodities", commodities)
    installations && formData.append("installations", installations)

    return axios.post("/api/getHousesWithFilter", formData, config)
}

export const GetHousesWithOwnerId = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get("/api/getHousesWithOwnerId/" + id, config)
}

export const AddInterest = (
    idHouse: string //nome e Id do user são retirados do token
) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    formData.append("idHouse", idHouse)


    return axios.post("/api/addInterest", formData, config)
}

export const GetInterestsWithHouseId = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get("/api/getInterestsByHouseId/" + id, config)
}

export const GetInterestsByUserId = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get("/api/getInterestsByUserId/" + id, config)
}



//CONTRACT
//MICROSERVICE
//FUNCTIONS
export const AddContract = (
    houseId: string, startContract: string, endContract: string,
    terms: string, price: string, contractType: string,
    hostId: string, studentId: string
    ) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    formData.append("houseId", houseId)
    formData.append("startContract", startContract)
    formData.append("endContract", endContract)
    formData.append("terms", terms)
    formData.append("price", price)
    formData.append("contractType", contractType)
    formData.append("hostId", hostId)
    formData.append("studentId", studentId)
    return axios.post("/api/addContract", formData, config)
}

export const GetAllContracts = () => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get("/api/getAllContracts", config)
}

export const GetContractById = (id: string) => {
    return axios.get("/api/getContractById/" + id, config)
}

export const GetContractByUserId = (id: string) => {
    return axios.get("/api/getContractByUserId/" + id, config)
}


//REVIEW
//MICROSERVICE
//FUNCTIONS
export const GetReviewById = (id: string) => {
    return axios.get("/api/GetReviewById/" + id, config)
}

export const AddReview = (
    userIdReview?: string, idReviewed?: string, rating?: string,type?: string
) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    userIdReview && formData.append("userIdReview", userIdReview)
    idReviewed && formData.append("idReviewed", idReviewed)
    rating && formData.append("rating", rating)
    type && formData.append("type", type)

    return axios.post("/api/addReview", formData, config)
}


//SERVICE
//MICROSERVICE
//FUNCTIONS

//TRANSACTION
//MICROSERVICE
//FUNCTIONS
export const AddTransaction = (buyerId: string, sellerId: string, contractId: string, amount: string, paymentType: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    formData.append("buyerId", buyerId)
    formData.append("sellerId", sellerId)
    formData.append("contractId", contractId)
    formData.append("amount", amount)
    formData.append("paymentType", paymentType)

    return axios.post("/api/addTransaction", formData, config)
}

export const GetAllTransactions = () => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get("/api/getAllTransactions", config)
}

export const GetTransactionById = (id: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get("/api/getTransactionById/" + id, config)
}

export const GetTransactionByUserId = (userId: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get("/api/getTransactionByUserId/" + userId, config)
}

export const GetTransactionsByDate = (date: string) => {
    let token = localStorage.getItem("UHomeToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get("/api/getTransactionsByDate/" + date, config)
}

