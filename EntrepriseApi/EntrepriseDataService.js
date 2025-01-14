import {
    ENTERPRISE_API_URL,
    ENTERPRISE_SOCKET_URL,
    CREATE_ENTREPRISE,
    CREATE_PROJECT,
    CREATE_TASK,
    CHECK_ENTERPRISE_MEMBERSHIP,
    CHECK_ENTERPRISE_SERVER_CONNECTION,
    GET_ENTREPRISE_MEMBERS,
    GET_PROJECTS_DATA,
    GET_ENTREPRISE_DATA,
    GET_TASKS_DATA
} from "./EntrepriseEndpoints";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from "socket.io-client";
import { getToken } from "../api/authService";
import { Alert } from 'react-native';


export const checkServerConnection = async () => {
    try {
        const response = await axios.get(ENTERPRISE_API_URL + CHECK_ENTERPRISE_SERVER_CONNECTION);
        
        return response.status

    } catch (error) {
        Alert.alert('Server Error', 'Not connected to the enterprise server : ');
        console.log('Error checking server connection: ', error);
    }
};


export const checkEnterpriseMembership = async () => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.get(ENTERPRISE_API_URL + CHECK_ENTERPRISE_MEMBERSHIP, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
            console.log(response.status);
            return response.status
        }
    }
    catch (error) {
        Alert.alert('Server Error', 'Not a member of enterprise : ');
        console.error('Error checking enterprise membership: ', error);
    }
}

export const createEnterprise = async (enterpriseData) => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.post(ENTERPRISE_API_URL + CREATE_ENTREPRISE , enterpriseData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
        }
        
    } catch (error) {
        console.error('Error creating enterprise: ', error);
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.post(ENTERPRISE_API_URL + CREATE_PROJECT , projectData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
            console.log(" Liste des projets ---> ", response.data);

            if (response.status === 200) {
                Alert.alert('Success', 'Project created successfully');
                return response.data;
            }
            else {
                Alert.alert('Server Error', 'Erreur pour la création : ');
            }
        }
        
    } catch (error) {
        console.error('Error creating project: ', error);
        throw error;
    }
};


export const getEnterpriseData = async () => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.get(ENTERPRISE_API_URL + GET_ENTREPRISE_DATA, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error getting enterprise data: ', error);
        throw error;
    }
}
// Route  pour obtenir tous les membres d'une entreprise

export const getEnterpriseMembers = async () => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.get(ENTERPRISE_API_URL + GET_ENTREPRISE_MEMBERS, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error getting enterprise members: ', error);
        throw error;
    }
}

export const getProjectData = async () => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.get(ENTERPRISE_API_URL + GET_PROJECTS_DATA, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error getting project data: ', error);
        throw error;
    }
}


export const getTaskData = async (projectId) => {
    try {
        const token = await getToken();
        if (token) {
            const response = await axios.get(ENTERPRISE_API_URL + GET_TASKS_DATA + "/" + projectId, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error getting task data: ', error);
        throw error;
    }
}


export const createTask = (projectId, taskData) => {
    // Reformater les dates au format ISO (YYYY-MM-DD) avant d'envoyer les données

    console.log("Tâche ---> ", taskData);

    try {
        const token = getToken();
        if (token) {
            const response = axios.post(ENTERPRISE_API_URL + CREATE_TASK + "/" + projectId, taskData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error creating task: ', error);
        throw error;
    }
}