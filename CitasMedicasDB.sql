-- Crear base de datos
CREATE DATABASE CitasMedicasDB;
GO

-- Usar base de datos
USE CitasMedicasDB;
GO

-- Tabla Paciente
CREATE TABLE Paciente (
    id_paciente INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(100)
);
GO

-- Tabla Medico
CREATE TABLE Medico (
    id_medico INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    correo VARCHAR(100)
);
GO

-- Tabla Especialidad
CREATE TABLE Especialidad (
    id_especialidad INT IDENTITY(1,1) PRIMARY KEY,
    nombreEspecialidad VARCHAR(50) NOT NULL
);
GO

-- Tabla Medico_Especialidad
CREATE TABLE Medico_Especialidad (
    id_medico INT,
    id_especialidad INT,
    PRIMARY KEY (id_medico, id_especialidad),
    FOREIGN KEY (id_medico) REFERENCES Medico(id_medico),
    FOREIGN KEY (id_especialidad) REFERENCES Especialidad(id_especialidad)
);
GO

-- Tabla Citas
CREATE TABLE Cita (
    id_cita INT IDENTITY(1,1) PRIMARY KEY,
    id_paciente INT,
    id_medico INT,
    fecha DATE,
    hora TIME,
    motivo VARCHAR(MAX),
    estado VARCHAR(20),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_medico) REFERENCES Medico(id_medico),
    CHECK (estado IN ('Programada', 'Cancelada', 'Completada'))
);
GO

-- Tabla Consulta
CREATE TABLE Consulta (
    id_consulta INT IDENTITY(1,1) PRIMARY KEY,
    id_cita INT,
    diagnostico VARCHAR(MAX),
    tratamiento VARCHAR(MAX),
    observaciones VARCHAR(MAX),
    FOREIGN KEY (id_cita) REFERENCES Cita(id_cita)
);
GO

-- Insertar Pacientes
INSERT INTO Paciente (nombre, apellido, fechaNacimiento, telefono, correo)
VALUES
('Juan', 'Pérez', '1990-05-12', '555-123-4567', 'juan.perez@gmail.com'),
('María', 'López', '1985-09-30', '555-234-5678', 'maria.lopez@gmail.com'),
('Carlos', 'Ramírez', '1978-12-22', '555-345-6789', 'carlos.ramirez@gmail.com'),
('Ana', 'Martínez', '1995-03-18', '555-456-7890', 'ana.martinez@gmail.com'),
('Luis', 'Hernández', '2000-07-08', '555-567-8901', 'luis.hernandez@gmail.com');

-- Insertar Médicos
INSERT INTO Medico (nombre, apellido, telefono, correo)
VALUES
('Roberto', 'García', '555-678-9012', 'roberto.garcia@gmail.com'),
('Elena', 'Fernández', '555-789-0123', 'elena.fernandez@gmail.com'),
('Miguel', 'Torres', '555-890-1234', 'miguel.torres@gmail.com'),
('Laura', 'Vega', '555-901-2345', 'laura.vega@gmail.com'),
('Andrés', 'Morales', '555-012-3456', 'andres.morales@gmail.com');

-- Insertar Especialidades
INSERT INTO Especialidad (nombreEspecialidad)
VALUES
('Cardiología'),
('Dermatología'),
('Pediatría'),
('Neurología'),
('Oftalmología');

-- Relación Medico_Especialidad
INSERT INTO Medico_Especialidad (id_medico, id_especialidad)
VALUES
(1, 1), -- Roberto García - Cardiología
(1, 4), -- Roberto García - Neurología
(2, 2), -- Elena Fernández - Dermatología
(3, 3), -- Miguel Torres - Pediatría
(4, 5); -- Laura Vega - Oftalmología

-- Insertar Citas
INSERT INTO Cita (id_paciente, id_medico, fecha, hora, motivo, estado)
VALUES
(1, 1, '2025-08-10', '10:00', 'Chequeo general', 'Programada'),
(2, 2, '2025-08-11', '11:30', 'Revisión de piel', 'Programada'),
(3, 3, '2025-08-12', '09:00', 'Consulta pediátrica para hijo', 'Completada'),
(4, 4, '2025-08-13', '15:45', 'Revisión ocular', 'Cancelada'),
(5, 1, '2025-08-14', '14:15', 'Dolor en el pecho', 'Programada');

-- Insertar Consultas
INSERT INTO Consulta (id_cita, diagnostico, tratamiento, observaciones)
VALUES
(1, 'Salud estable', 'Continuar dieta balanceada', 'Revisión en 6 meses'),
(2, 'Dermatitis leve', 'Crema hidratante y protector solar', 'Evitar exposición prolongada al sol'),
(3, 'Gripe común', 'Reposo y líquidos abundantes', 'Se recomienda vitamina C'),
(4, 'No aplica', 'No aplica', 'Cita cancelada por el paciente'),
(5, 'Angina de pecho', 'Medicamento vasodilatador', 'Revisar evolución en 2 semanas');
