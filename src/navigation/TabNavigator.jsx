import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { StyleSheet, Text } from "react-native";
import { colors } from "../global/colors";
import Icon from 'react-native-vector-icons/MaterialIcons'
import ProfileNavigator from "./ProfileNavigator";
import MyPlaceNavigator from "./MyPlaceNavigator";


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
                        tabBarIcon: ({focused})=>(<Icon name="shopping-bag" size={32} color={focused?colors.azulOscuroTab:colors.azulPrimario} />)
                    }}
                    />
                <Tab.Screen 
                    component={CartNavigator} 
                    name="Cart"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="shopping-cart" size={32} color={focused?colors.azulOscuroTab:colors.azulPrimario} />)
                    }}/>
                <Tab.Screen 
                    component={ReceiptsNavigator} 
                    name="Receipts"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="receipt-long" size={32} color={focused?colors.azulOscuroTab:colors.azulPrimario} />)
                    }}/>
                
                <Tab.Screen 
                    component={MyPlaceNavigator} 
                    name="Places"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="location-on" size={32} color={focused?colors.azulOscuroTab:colors.azulPrimario} />)
                    }}/>
                <Tab.Screen 
                    component={ProfileNavigator} 
                    name="Profile"
                    options={{
                        tabBarIcon: ({focused})=>(<Icon name="account-circle" size={32} color={focused?colors.azulOscuroTab:colors.azulPrimario} />)
                    }}/>
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar:{
        height:74,
        backgroundColor: colors.azulPrimarioOscuro
    }
})

export default TabNavigator;
