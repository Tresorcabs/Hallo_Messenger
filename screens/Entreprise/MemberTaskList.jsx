import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import CustomSearchBarTwo from '../../components/CustomSearchBarTwo'
import colors from '../../components/colors'

const MemberTaskList = () => {

    // const renderTask = ({ item }) => {
    //     return (
    //         <TouchableOpacity
    //             style={styles.taskContainer}
    //             onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
    //         >
    //             <View style={styles.taskInfos}>
    //                 <View style={styles.taskNameContainer}>
    //                     <Text style={styles.taskName}>{item.taskName}</Text>
    //                     <Text style={styles.taskDescription}>{item.taskDescription}</Text>
    //                 </View>
    //                 <TouchableOpacity style={styles.taskStatusContainer}>
    //                     {item.taskStatus === "terminé" ? (
    //                         <Icon name="checkmark-circle" size={20} color={colors.primary_200} />
    //                     ) : (
    //                         <Icon name="hourglass" size={20} color={colors.primary_200} />
    //                     )}
    //                 </TouchableOpacity>
    //             </View>

    //             <View style={styles.actorsProfilesContainer}>
    //                 <View style={styles.expiringDateContainer}>
    //                     <Icon name='timer-outline' size={17} color={colors.primary_200} style={{ opacity: 0.8 }} />
    //                     <Text style={styles.expiringDate}>{item.expiringDate}</Text>
    //                 </View>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // };





    return (
        <View style={styles.container}>
            {/** Barre de recherche */}
            <View style={styles.headerDuMenu}>
                <CustomSearchBarTwo
                    searchBarButtonStyle={{ position: "absolute", right: 15, borderRadius: 50, width: 40, height: 40, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondary_btn_bg, elevation: 3 }}
                    searchBarIconButtonStyle={colors.primary_200}
                    searchBarStyle={{ height: 45, width: "90%", position: "absolute", paddingLeft: 10, borderRadius: 50, }}
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

            {/* <FlatList
                data={projetTasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
            /> */}
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
    }
})

export default MemberTaskList