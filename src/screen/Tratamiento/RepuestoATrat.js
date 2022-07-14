import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView,   Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";
import Dropdown from "../../components/Dropdown";

import conectionDb from "../../database/conectionDb";
const db = conectionDb.getConnection();


export function RepuestoATrat() {
  
    //Define varios Estados 
    const [id, setId] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [repuesto, setRepuesto] = useState([]);
    const [Selecrepuesto, setSelecRepuesto] = useState(undefined);

    const [Tratamiento, setTrat] = useState([]);
    const [SelectTrat, setSelectTrat] = useState(undefined);
  

      // se ejecuta cuando se crea la vista y permite guardar los tratamientos y los repuestos en 2 selectores difernetes
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(`SELECT * FROM repuesto`, [], (tx, results) => {
            console.log("results", results);
      
            // validar resultado
            if (results.rows.length > 0) {
              var temp = [];
      
              for (let i = 0; i < results.rows.length; ++i)
              {
                let element = 
      
       
       
                  {value:results.rows.item(i).name,
                    label: results.rows.item(i).name}
                
                  
                 temp.push(element)
                 console.log(element)
             
          
       
              }
              setRepuesto(temp)
         
      
              console.log(repuesto)
        
            } 
          });
          tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
            console.log("results", results);
      
            // validar resultado
            if (results.rows.length > 0) {
              var temp = [];
      
              for (let i = 0; i < results.rows.length; ++i)
              {
                let element = 
      
       
       
                  {value:results.rows.item(i).name,
                    label: results.rows.item(i).name}
                
                  
                 temp.push(element)
                 console.log(element)
             
          
       
              }
              setTrat(temp)
         
      
              console.log(Tratamiento)
        
            } 
          });
    
    
        });
      },[] );
    // nos permite actualizar el selector de tratamiento
    const BuscarTratamiento = () => {
    
        db.transaction((tx) => {
        
            tx.executeSql(`SELECT * FROM tratamiento`, [], (tx, results) => {
              console.log("results", results);
        
              // validar resultado
              if (results.rows.length > 0) {
                var temp = [];
        
                for (let i = 0; i < results.rows.length; ++i)
                {
                  let element = 
        
         
         
                    {value:results.rows.item(i).name,
                      label: results.rows.item(i).name}
                  
                    
                   temp.push(element)
                   console.log(element)
               
            
         
                }
                setTrat(temp)
           
        
                console.log(Tratamiento)
          
              } 
            });
      
      
          });
        };
      
    
      const clearData = () => {
        // Permite limpiar los datos del formulario 
    
        setCantidad("");
      };
    

      // Secuencia que nos permite borrar un repuesto asociado a un tratamiento
      const borrarRepuesto = () => {
        console.log("deletTratamiento");
        db.transaction((tx) => {
          tx.executeSql(
            `DELETE FROM Trat_repuesto WHERE T_name= ? and R_name=?`,
            
            [SelectTrat, Selecrepuesto],
            (tx, results) => {
              console.log("results", results);
              // validar resultado
              if (results.rowsAffected > 0) {
                Alert.alert("Repuesto eliminado");
            
              } else {
                Alert.alert("El Repuesto no existe");
              }
            }
          );
        });
      };

    
      const registerRepuesto = () => {
      console.log("states", cantidad, Selecrepuesto, SelectTrat);
      // validaciones estados
    
      
      debugger;
    
        //Validar si los campos de formularios tienen datos
        if (!cantidad.trim()) {
          Alert.alert("Ingrese la cantidad");
          return;
        }
    
        // Secuencia Sql que ingresa el repuesto a un tratamiento
        db.transaction((tx) => {
          tx.executeSql(

          `INSERT INTO Trat_repuesto(T_name, R_name, cantidad ) VALUES (?, ?, ?)`,
            [SelectTrat, Selecrepuesto, cantidad ],
            (tx, results) => {
              console.log("results", results);
              // validar resultado
              if (results.rowsAffected > 0) {
                clearData();
                Alert.alert(
                  "Exito",
                  "repuesto Agregado!!!",
                  
                  [
                    {
                      text: "Ok",
                  
                    },
                  ],
                  { cancelable: false }
                  
                );
              } else {
                Alert.alert("Error al registrar el repuesto ");
              }
    
            },
            Alert.alert("Ya existe este repuesto")
          );
        });

      };
      return (
// Formulario para selecionar que repuesto se asocia a que tratamiento y la cantidad
        <><MyText  text="Agregar Repuesto a tratamiento" style={styles.Title} /><View style={styles.viewContainer}>
          <View style={styles.generalView}>
            <ScrollView>
              <KeyboardAvoidingView style={styles.keyboardView}>
       
              <MyText  text="Seleccionar Tratamiento" style={styles.TextDrop}  />
              <Dropdown data={Tratamiento} selected={setSelectTrat}/>

              <MyText  text="Seleccionar Repuesto" style={styles.TextDrop}  />
              <Dropdown data={repuesto} selected={setSelecRepuesto}/>
     
    
              <MyInputText
                          placeholder="Cantidad"
            
                          onChangeText={setCantidad}
                          style={styles.emailInput}
                          value={cantidad} />
            
    
              <MySingleButton
                  title="Buscar Tratamiento"
                  customPress={BuscarTratamiento} />
                <MySingleButton
                  title="Guardar Repuesto"
                  customPress={registerRepuesto} />
            <MySingleButton
              title="Borrar Repuesto"
              customPress={borrarRepuesto} />
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </View></>
     
     
     
        
        )
    
    }
    export default RepuestoATrat
    
    
    
    
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        viewContainer: {
          flex: 1,
          backgroundColor: "white",
        },
        generalView: {
          flex: 1,
        },
        keyboardView: {
          flex: 1,
          justifyContent: "space-between",
        },
        nameInput: {
          padding: 15,
          textAlignVertical: "top",
        },
        passwordInput: {
          padding: 15,
          textAlignVertical: "top",
        },
        emailInput: {
          padding: 15,
          textAlignVertical: "top",
        },
        TextDrop: {
          fontSize: 15,
          padding: 5,
          marginLeft: 25,
        
        },
        Title:{
          fontSize: 20,
      alignSelf: "center",
      marginTop : 10,
      marginBottom: 20,
        }
      });