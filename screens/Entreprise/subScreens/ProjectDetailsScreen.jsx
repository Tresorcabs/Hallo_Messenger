import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../components/colors';
import { useContext } from 'react';
import { EnterpriseDataContext } from '../../../Contexts/EntrepriseDataContext';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { createTask, getTaskData } from '../../../EntrepriseApi/EntrepriseDataService';
import ProgressCircle from '../../../components/ProgressCircle';
import { Modal, View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Platform } from 'react-native';
import { textarea } from '@material-tailwind/react';


const ProjectDetailsScreen = () => {
    const navigation = useNavigation();
    const { updateGeneralData, generalData } = useContext(EnterpriseDataContext);
    const route = useRoute();
    const { ProjectData } = route.params;

    useEffect(() => {
        console.log(generalData, ProjectData.id);
        getProjectTaskData();
    }, []);

    const [projetTasks, setProjetTasks] = useState([
        {
            id: "t1",
            taskName: "Réaliser la maquette du site vitrine",
            taskDescription: "Vous devrez réaliser la maquette de notre plateforme en ligne...",
            taskStatus: "terminé",
            expiringDate: "10/09/2024",
        },
    ]);

    const terminatedTask = projetTasks.reduce((accumulator, currentValue) => {
        if (currentValue.taskStatus === "terminé") {
            accumulator += 1;
        }
        return accumulator;
    }, 0);
    const getProjectTaskData = async () => {
        const response = await getTaskData(ProjectData.id);
        if (response) {
            setProjetTasks(response);
            console.log("Liste des projets ---> ", response);
        }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newProject, setNewProject] = useState({
        nom: '',
        description: '',
        statut: 'En cours', // default value
    });

    const handleInputChange = (name, value) => {
        setNewProject({ ...newProject, [name]: value });
    };

    const date = new Date();
    const formatedDate = moment(date).format('DD/MM/YYYY');

    const refreshing = true;
    const [newTask, setNewTask] = useState({
        nom: '',
        description: '',
        date_debut: date,
        date_fin: date,
        priorite: '',
        statut: 'En cours', // Par défaut à "En cours"
        assigne_a: null,  // Pour stocker l'ID du membre sélectionné
    });
    const [errors, setErrors] = useState({});

    const handleInputChangeTask = (field, value) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const handleMemberSelection = (memberId) => {
        setNewTask({ ...newTask, assigne_a: memberId });
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!newTask.nom) tempErrors.nom = 'Le nom de la tâche est obligatoire';
        if (!newTask.description) tempErrors.description = 'La description de la tâche est obligatoire';
        if (!newTask.date_debut) tempErrors.date_debut = 'La date de début est obligatoire';
        if (!newTask.date_fin) tempErrors.date_fin = 'La date de fin est obligatoire';
        if (!newTask.assigne_a) tempErrors.assigne_a = 'Veuillez assigner un membre';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddTask = async () => {
        const response = await createTask(ProjectData.id, newTask);
        if (response) {
            setProjetTasks([...projetTasks, response]);
            setIsModalVisible(false);
            console.log(formatedDate, " Nouvelle tâche ---> ", response);
        }
        //console.log(" Nouvelle tâche ---> ", newTask);
    };

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDateFinPicker, setShowDateFinPicker] = useState(false);

    const handleDateChange = (field, event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        //console.log("dd T", textarea);

        const formattedDate = currentDate.toISOString(); // Convertir la date en chaîne de caractères

        if (field === 'date_debut') {
            console.log("date_debut", terminatedTask);
            setNewTask({ ...newTask, date_debut: formattedDate });
        }

        if (field === 'date_fin') {
            console.log("date_fin", formattedDate);
            setNewTask({ ...newTask, date_fin: formattedDate });
        }
        setShowDatePicker(false);
    };

    const handleInputChangeDate = (field, value) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const formatInputDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        let formatted = '';
        if (cleaned.length > 0) {
            formatted += cleaned.substring(0, 2); // jours
        }
        if (cleaned.length >= 2) {
            formatted += '/' + cleaned.substring(2, 4); // mois
        }
        if (cleaned.length >= 4) {
            formatted += '/' + cleaned.substring(4, 8); // année
        }
        return formatted;
    };

    const renderTask = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.taskContainer}
                onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            >
                <View style={styles.taskInfos}>
                    <View style={styles.taskNameContainer}>
                        <Text style={styles.taskName}>{item.taskName}</Text>
                        <Text style={styles.taskDescription}>{item.taskDescription}</Text>
                    </View>
                    <TouchableOpacity style={styles.taskStatusContainer}>
                        {item.taskStatus === "terminé" ? (
                            <Icon name="checkmark-circle" size={20} color={colors.primary_200} />
                        ) : (
                            <Icon name="hourglass" size={20} color={colors.primary_200} />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.actorsProfilesContainer}>
                    <View style={styles.expiringDateContainer}>
                        <Icon name='timer-outline' size={17} color={colors.primary_200} style={{ opacity: 0.8 }} />
                        <Text style={styles.expiringDate}>{item.expiringDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Icon name="arrow-back" size={25} color={colors.pureWhite} onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton}>
                    <Icon name="ellipsis-vertical" size={25} color={colors.pureWhite} />
                </TouchableOpacity>
            </View>

            <View style={styles.infosContainer}>

                <ProgressCircle completedTasks={terminatedTask} totalTasks={projetTasks.length} />

                <View style={{ alignSelf: "center", marginTop: 5 }}>
                    <Text>de progression</Text>
                </View>
                <Text style={styles.nom}>Nom : {ProjectData.nom}</Text>
                <Text style={styles.description}>Description : {ProjectData.description}</Text>
            </View>

            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Pressed')}>
                    <Icon name="chatbox-ellipses" size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Ouvrir le chat du projet </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => setIsModalVisible(true)}>
                    <Icon name='add-circle' size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Ajouter un tâche </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Pressed')}>
                    <Icon name='brush' size={25} color={colors.primary} style={styles.actionButtonIcon} />
                    <Text style={styles.actionButtonText}> Modifier le projet </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.commonTasksContainer}>
                <View style={styles.commonTasksHeader}>
                    <Text style={styles.commonTasksHeaderText}>Tâches du projet</Text>
                </View>

                <FlatList
                    data={projetTasks}
                    renderItem={renderTask}
                    keyExtractor={item => item.id}
                />
            </View>

            {/* Add Project Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(!isModalVisible)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Ajouter une tâche</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nom de la tâche"
                            value={newTask.nom}
                            onChangeText={(text) => handleInputChangeTask('nom', text)}
                        />
                        {errors.nom && <Text style={styles.errorText}>{errors.nom}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Description de la tâche"
                            value={newTask.description}
                            onChangeText={(text) => handleInputChangeTask('description', text)}
                        />
                        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

                        <View style={styles.datePickerContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de début (dd/mm/yyyy)"
                                value={newTask.date_debut}
                                onChangeText={(text) => handleInputChangeDate('date_debut', text)}
                                onFocus={() => setShowDatePicker(!showDatePicker)}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => handleDateChange('date_debut', event, selectedDate)}
                                />
                            )}
                        </View>
                        {errors.date_debut && <Text style={styles.errorText}>{errors.date_debut}</Text>}

                        <View style={styles.datePickerContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Date de fin (dd/mm/yyyy)"
                                value={newTask.date_fin}
                                onChangeText={(text) => handleInputChangeDate('date_fin', text)}
                                onFocus={() => setShowDatePicker(!showDatePicker)}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => handleDateChange('date_fin', event, selectedDate)}
                                />
                            )}
                        </View>
                        {errors.date_fin && <Text style={styles.errorText}>{errors.date_fin}</Text>}

                        <Picker
                            selectedValue={newTask.priorite}
                            onValueChange={(itemValue) => handleInputChangeTask('priorite', itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Sélectionner la priorité" value="" />
                            <Picker.Item label="Haute" value="Haute" />
                            <Picker.Item label="Moyenne" value="Moyenne" />
                            <Picker.Item label="Basse" value="Basse" />
                        </Picker>

                        {/* Sélecteur de membre */}

                        <Text style={[styles.label, { fontWeight: 'bold' }]}>Assigner un membre :</Text>
                        <Picker
                            selectedValue={newTask.assigne_a}
                            onValueChange={(itemValue) => handleMemberSelection(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Sélectionner un membre" value={null} />
                            {generalData.membersData.map((member) => (
                                <Picker.Item
                                    key={member.memberId}
                                    label={member.name}

                                    value={member.memberId}
                                />
                            ))}
                        </Picker>
                        {errors.assigne_a && <Text style={styles.errorText}>{errors.assigne_a}</Text>}


                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleAddTask}
                        >
                            <Text style={styles.buttonText}>Ajouter</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 10,
    },
    header: {
        width: "100%",
        height: 100,
        elevation: 5,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingTop: 20,
        alignItems: 'center',
    },
    divider: {
        display: 'flex',
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
    },


    infosContainer: {
        display: "flex",
        flexDirection: 'column',
        gap: 10,
        height: 250,
        justifyContent: 'center',
        width: "95%",
        paddingHorizontal: 20,
        backgroundColor: colors.pureWhite,
        elevation: 1,
        borderRadius: 10,
    },
    profilImage: {
        width: 130,
        height: 130,
        borderRadius: 100,
    },
    statusIndicator: {
        position: 'absolute',
        right: 20,
        bottom: 5,
        width: 20,
        height: 20,
        borderColor: colors.statutIndicatorBorder,
        borderRadius: 50,
        borderWidth: 3,
    },

    // style de la liste des activités / Tâches
    taskContainer: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        backgroundColor: colors.glassBlackBtn,
    },
    taskInfos: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    taskNameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 10,
        marginVertical: 5,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 12,
    },
    expiringDate: {
        fontWeight: "600",
        fontStyle: "italic",
        color: colors.primary_200,
        opacity: .6
    },
    expiringDateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    actorsProfilesContainer: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    actorsProfiles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actorsProfile: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: -2,
    },

    taskStatusContainer: {
        width: 20,
        height: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    nom: {
        fontSize: 20,
        fontWeight: '600'
    },
    description: {
        fontSize: 15,
        letterSpacing: 1.5,
    },
    actionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.pureWhite,
        elevation: 1,
        width: '95%',
        paddingHorizontal: 10,
        height: 110,
        paddingTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    actionButton: {
        flexDirection: "column",
        width: "31%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: colors.secondary_btn_bg,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary_200,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.primary_200,
    },
    commonTasksContainer: {
        height: 400,
        width: "95%",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: colors.pureWhite,
        elevation: 1,
        borderRadius: 10,
    },

    dangerousActionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.pureWhite,
        elevation: 1,
        width: '95%',
        paddingHorizontal: 10,
        height: 110,
        paddingTop: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    dangerousActionButton: {
        flexDirection: "column",
        width: "31%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.redAlert,
        backgroundColor: colors.alertButtonBg,
    },
    dangerousActionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.redAlert,
    },
    commonTasksHeader: {
        padding: 5,
    },
    commonTasksHeaderText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary_bold,
    },

    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        height: 520,
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginHorizontal: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    buttonText: {
        color: colors.pureWhite,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: colors.glassBlackBtn,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: colors.pureBlack,
        fontWeight: 'bold',
    },
    modalButtons: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
});

export default ProjectDetailsScreen