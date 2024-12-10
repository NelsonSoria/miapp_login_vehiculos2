import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Switch, ScrollView, Alert, StyleSheet } from "react-native";
import { editarVehiculo, obtenerVehiculos } from "../controllers/VehiculoConstroller";

export default function EditarVehiculoPantalla({ navigation, route }) {
    const { placa } = route.params;
    const [vehiculo, setVehiculo] = useState(null);
    const [marca, setMarca] = useState("");
    const [fecFabricacion, setFecFabricacion] = useState("");
    const [color, setColor] = useState("");
    const [costo, setCosto] = useState("");
    const [activo, setActivo] = useState(true);

    useEffect(() => {
        const vehiculoEncontrado = obtenerVehiculos().find((v) => v.placa === placa);
        if (vehiculoEncontrado) {
            setVehiculo(vehiculoEncontrado);
            setMarca(vehiculoEncontrado.marca);
            setFecFabricacion(vehiculoEncontrado.fecFabricacion);
            setColor(vehiculoEncontrado.color);
            setCosto(vehiculoEncontrado.costo.toString());
            setActivo(vehiculoEncontrado.activo);
        } else {
            Alert.alert("Error", "Vehículo no encontrado.");
            navigation.goBack();
        }
    }, [placa, navigation]);

    const handleEditVehicle = () => {
        if (!marca || !fecFabricacion || !color || !costo) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        const updatedVehiculo = {
            placa,
            marca,
            fecFabricacion,
            color,
            costo: parseFloat(costo),
            activo,
        };

        editarVehiculo(placa, updatedVehiculo);
        Alert.alert("Éxito", "Vehículo actualizado.");
        navigation.navigate("VehiculosPantalla");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Placa:</Text>
                <TextInput
                    style={styles.input}
                    value={placa}
                    editable={false}
                />

                <Text style={styles.label}>Marca:</Text>
                <TextInput
                    style={styles.input}
                    value={marca}
                    onChangeText={setMarca}
                />

                <Text style={styles.label}>Fecha de fabricación:</Text>
                <TextInput
                    style={styles.input}
                    value={fecFabricacion}
                    onChangeText={setFecFabricacion}
                />

                <Text style={styles.label}>Color:</Text>
                <TextInput
                    style={styles.input}
                    value={color}
                    onChangeText={setColor}
                />

                <Text style={styles.label}>Costo:</Text>
                <TextInput
                    style={styles.input}
                    value={costo}
                    onChangeText={setCosto}
                    keyboardType="numeric"
                />

                <View style={styles.switchContainer}>
                    <Text style={styles.label}>Activo:</Text>
                    <Switch
                        value={activo}
                        onValueChange={setActivo}
                    />
                </View>

                <Button title="Guardar cambios" onPress={handleEditVehicle} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
});
