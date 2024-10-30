import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { StyleSheet, Text } from "react-native";
import { colors } from "../global/colors";
import Icon from 'react-native-vector-icons/MaterialIcons'


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
            <Tab.Navigator
                initialRouteName="Shop"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar
                }}>
                <Tab.Screen 
                    component={ShopNavigator} 
                    name="Shop"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="shopping-bag" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />)
                    }}
                    />
                <Tab.Screen 
                    component={CartNavigator} 
                    name="Cart"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />)
                    }}/>
                <Tab.Screen 
                    component={ReceiptsNavigator} 
                    name="Receipts"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="receipt-long" size={32} color={focused?colors.grisOscuro:colors.grisMedio} />)
                    }}/>
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar:{
        height:74,
        backgroundColor: colors.grisClaro
    }
})

export default TabNavigator;
