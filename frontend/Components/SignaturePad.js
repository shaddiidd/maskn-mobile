import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { captureRef } from "react-native-view-shot";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const SignaturePad = forwardRef(({ canvasStyle }, ref) => {
    const [paths, setPaths] = useState([]);
    const currentPath = useRef("");
    const canvasRef = useRef(null);

    const handleTouchMove = (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current += `L${locationX},${locationY} `;
        const updatedPaths = [...paths];
        updatedPaths[updatedPaths.length - 1] = currentPath.current;
        setPaths(updatedPaths);
    };

    const handleTouchStart = (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPath.current = `M${locationX},${locationY} `;
        setPaths((prev) => [...prev, currentPath.current]);
    };

    const handleClear = () => {
        setPaths([]);
    };

    const handleExport = async () => {
        if (!canvasRef.current) return null;
        try {
            const uri = await captureRef(canvasRef, {
                format: "png",
                quality: 1.0,
            });
            const resizedImage = await manipulateAsync(
                uri,
                [{ resize: { width: 100, height: 100 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            );
            return resizedImage.base64;
        } catch (error) {
            console.error("Failed to export signature:", error);
            return null;
        }
    };

    useImperativeHandle(ref, () => ({
        exportSignature: handleExport,
        clearSignature: handleClear,
    }));

    return (
        <View style={[styles.container, canvasStyle]}>
            <View
                ref={canvasRef}
                style={styles.canvas}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <Svg height="100%" width="100%">
                    {paths.map((pathData, index) => (
                        <Path
                            key={index}
                            d={pathData}
                            stroke="black"
                            strokeWidth={2}
                            fill="none"
                        />
                    ))}
                </Svg>
            </View>
            {paths.length > 0 && (
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    canvas: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
    },
    actions: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        columnGap: 10,
    },
    clearButton: {
        backgroundColor: "#ff4d4d",
        padding: 5,
        borderRadius: 5,
    },
    clearButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 12,
    },
});

export default SignaturePad;
