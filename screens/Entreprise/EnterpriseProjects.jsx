import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import ProgressCircle from '../../components/ProgressCircle';
import CustomSearchBarTwo from '../../components/CustomSearchBarTwo';
import { StyleSheet } from 'react-native';
import colors from '../../components/colors';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { createProject, getProjectData } from '../../EntrepriseApi/EntrepriseDataService';
import { Modal } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';



/**
 * Given a name string, returns the uppercase initials of the name.
 * The initials are determined by splitting the name on spaces and taking the
 * first character of each word.
 * @param {string} name - The name to extract initials from.
 * @returns {string} The uppercase initials of the name.
 * @example getInitials('John Doe') => 'JD'
 */
const getInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
};

// Function to generate a random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const EnterpriseProjects = () => {
    const navigation = useNavigation();

    const [projectsList, setProjectsList] = useState(null);


    const renderProjectsList = ({ item }) => {

        const initials = getInitials(item.nom);
        const randomColor = getRandomColor();

        return (

            <TouchableOpacity style={styles.projectContainer} onPress={() => navigation.navigate("ProjectDetailsScreen", { ProjectData: item })}>

                <View style={styles.projectTitleContainer}>
                    <View style={styles.projectLogoContainer}>
                        <View style={[styles.projectLogo, { backgroundColor: randomColor }]}>
                            <Text style={styles.logoText}>{initials}</Text>
                        </View>
                    </View>

                    <View style={styles.projectTitle}>
                        <Text style={styles.projectName}>{item.nom}</Text>
                        <Text style={styles.projectDescription}>{item.description.substring(0, 40) + "..."}</Text>
                    </View>

                </View>
                <View style={styles.projectInfos}>
                    <Text style={styles.projectEvolution}>Evolution : {item.evolution}</Text>
                    <Text style={styles.projectStatut}>Statut: {item.statut}</Text>
                    <Text style={styles.projectDate}>Crée le : {item.date_creation}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const [isExtended, setIsExtended] = useState(false);

    useEffect(() => {
        getEnterpriseProjects();
    }, []);

    const getEnterpriseProjects = async () => {
        try {
            const response = await getProjectData();
            if (response) {
                setProjectsList(response);
                //console.log("Liste des projets ---> ", response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onScroll = (event) => {
        const currentScrollPosition = event.nativeEvent?.contentOffset?.y; // On récupère la position du scroll actuelle
        const isScrollingUp =
            currentScrollPosition < (onScroll.lastScrollPosition || 0); // On compare la position actuelle avec la position précedente
        setIsExtended(false); // on compare la position du scroll avec 0

        onScroll.lastScrollPosition = currentScrollPosition; // On met a jour la position

    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newProject, setNewProject] = useState({
        nom: '',
        description: '',
        statut: 'En cours', // default value
    });

    // Function to handle form input change
    const handleInputChange = (name, value) => {
        setNewProject({ ...newProject, [name]: value });
    };


    const refreshing = true;
    // Function to handle API call and add new project
    const handleAddProject = async () => {
        try {
            // Example API call to add a project
            const response = await createProject(newProject);

            if (response) {
                console.log('Project added successfully');
                setIsModalVisible(false); // Close the modal after successful addition
            } else {
                console.error('Failed to add project');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={styles.container}>

            {/** Barre de recherche */}
            <View style={styles.headerDuMenu}>
                <CustomSearchBarTwo
                    searchBarButtonStyle={{ position: "absolute", right: 15, borderRadius: 50, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondary_btn_bg, elevation: 3 }}
                    searchBarIconButtonStyle={colors.primary_200}
                    searchBarStyle={{ height: 45, width: "85%", position: "absolute", paddingLeft: 10, borderRadius: 50, }}
                    searchBarPlaceholder="Rechercher..."
                    searchBarInputStyle={{
                        height: 45,
                        width: "95%",
                        backgroundColor: colors.secondary_btn_bg,
                        borderRadius: 50,
                        paddingHorizontal: 20,
                        elevation: 3,

                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                    }}
                />
            </View>

            <View style={styles.projectsListContainer}>
                <View style={styles.projectsListTitle}>
                    <Text style={styles.projectsListTitleText}>Liste des projets </Text>
                </View>

                <View style={styles.projectsList}>
                    {
                        projectsList !== null ?
                            //projectData.length > 0 ?
                            <FlatList
                                data={projectsList}
                                renderItem={renderProjectsList}
                                keyExtractor={(item) => item.id}
                                refreshing={refreshing}

                            />
                            :
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text>Vous n'avez encore crée aucun projet</Text>
                            </View>
                    }
                </View>



                {/* Add Project Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}

                >
                    <View style={styles.overlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Ajouter un nouveau projet</Text>

                            <TextInput
                                placeholder="Nom du projet"
                                style={styles.input}
                                value={newProject.nom}
                                onChangeText={(value) => handleInputChange('nom', value)}
                            />

                            <TextInput
                                placeholder="Description du projet"
                                style={styles.input}
                                value={newProject.description}
                                onChangeText={(value) => handleInputChange('description', value)}
                            />

                            <View style={styles.modalButtons}>
                                <Button title="Ajouter" color={colors.primary} onPress={handleAddProject} />
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                    <Text style={styles.cancelButtonText}>Annuler</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Fab Button to open modal */}
                <AnimatedFAB
                    icon="plus"
                    label="Nouveau projet"
                    animateFrom="right"
                    extended={false}
                    visible={true}
                    iconMode="dynamic"
                    color={colors.secondary_btn_bg}
                    style={styles.fabStyle}
                    onPress={() => setIsModalVisible(true)}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pureWhite,
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    headerDuMenu: {
        paddingVertical: 10,
        paddingTop: 25,
        marginBottom: 30,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",

    },
    projectsListContainer: {
        flex: 1,
    },
    projectsListTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderTopWidth: 0.25,
        borderTopColor: colors.primary,
    },
    projectsListTitleText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "700",
    },
    projectsList: {
        flex: 1,
        padding: 10,
    },
    projectsListItem: {
        padding: 10,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.primary,
    },
    projectsListItemText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },
    fabStyle: {
        bottom: 40,
        right: 20,
        position: "absolute",
        backgroundColor: colors.primary,
    },
    projectDateContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    projectContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginVertical: 5,
        backgroundColor: colors.glassBlackBtn,
        paddingHorizontal: 15,
        paddingVertical: 25,
        borderRadius: 10,
    },
    projectTitleContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    projectInfos: {
        flexDirection: "column",
        gap: 5,
    },
    projectStatut: {
        color: colors.pureBlack,
        fontSize: 12,
        fontWeight: "700",
    },
    projectTitle: {
        flexDirection: "column",
        gap: 10,

    },
    projectName: {
        color: colors.pureBlack,
        fontSize: 16,
        fontWeight: "700",
    },
    projectDate: {
        color: colors.pureBlack,
        fontSize: 12,
        fontWeight: "700",
    },
    projectDescription: {
        color: colors.pureBlack,
        fontSize: 12,
        fontWeight: "700",
    },
    projectEvolution: {
        color: colors.pureBlack,
        fontSize: 12,
        fontWeight: "700",
    },
    projectLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    projectLogo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        height: 300,
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
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalButtons: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        left: 10,
        flexDirection: 'column',
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
});


export default EnterpriseProjects