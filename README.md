# pApp

## Introducción
La aplicación para dispositivos móviles se llama TeLlevoApp y corresponde al trabajo semestral de la asignatura "Programación de Aplicaciones Móviles", de la carrera Ingeniería en Informática del Instituto Profesional Duoc UC.
</br>

**Alumnos**
<ul>
 <li>Martín Orellana</li>
 <li>Pablo Maldonado</li>
</ul>
</br>

Para el correcto funcionamiento de esta aplicación, previamente es necesario descargar y seguir las instrucciones del repositorio **TestApi_Django**, indicado al final de este documento.

## Instrucciones

### 1. Preparar el entorno
**Instalar Node.js** (entorno de tiempo en ejecución)
 * Página oficial de descarga: https://nodejs.org/en/download
</br>

**Modificar Política de Ejecución de scripts**
 * Iniciar PowerShell en modo administrador y ejecutar el siguiente comando: _Set-ExecutionPolicy Unrestricted_
</br>

**Instalar Ionic** (SDK para la creación y desarrollo de aplicaciones móviles híbridas)
 * En PowerShell ejecutar: _npm install -g @ionic/cli_
</br>

**Instalar Angular** (framework utilizado por Ionic para la creación y desarrollo de aplicaciones móviles)
 * Ejecutar como comando CLI en el directorio del proyecto de Ionic: _npm install -g @angular/cli_
</br>

### 2. Instalar librerías de Node
  * Ejecutar como comando CLI en el directorio del proyecto de Ionic: _npm install_
</br>
  * Dependencias Capacitor para geolocalización (API Nativa): _npm install @capacitor/geolocation_
  * Sincronizar dependencias de Capacitor: _npx cap sync_ 

### 3. Ejecución
**Ejecución de servidor de MongoDB y proyecto Django**
  * Para establecer conexión con la base de datos, previamente es necesario descargar y seguir las instrucciones del siguiente repositorio: https://github.com/CybeR-LuduS/TestApi_Django 
</br>

**Ejecución del aplicación de Ionic**
  * Ejecutar como comando CLI en la carpeta del proyecto Django: _ionic serve_
