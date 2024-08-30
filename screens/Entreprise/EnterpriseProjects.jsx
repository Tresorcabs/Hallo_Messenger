import { View, Text } from 'react-native'
import React from 'react';
import ProgressCircle from '../../components/ProgressCircle';

const EnterpriseProjects = () => {
    return (
        <View>
            <Text>EnterpriseProjects</Text>
            {/* Exemple : 7 tâches complétées sur 10 */}
            <ProgressCircle completedTasks={7} totalTasks={10} />
        </View>
    )
}

export default EnterpriseProjects