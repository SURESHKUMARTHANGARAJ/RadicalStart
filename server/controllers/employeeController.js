const db = require('../models');
const Employee = db.employees;
const fs = require('fs');
const path = require('path');


// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving employees', error: error.message });
    }
};


// Get a single employee by ID
exports.getOneEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            res.status(200).json({ success: true, data: employee });
        } else {
            res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving employee', error: error.message });
    }
};


// Add a new employee
exports.addEmployee = async (req, res) => {
    const { id, name, department, designation, project, type, status } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const newEmployee = await Employee.create({
            id,
            name,
            department,
            designation,
            project,
            type,
            status,
            image
        });
        res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding employee', error: error.message });
    }
};


// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, department, designation, project, type, status } = req.body;
    const newImagePath = req.file ? req.file.path : undefined;

    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            
            if (newImagePath && employee.image) {
                const oldImagePath = path.join(__dirname, '..', employee.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting old image file:', err);
                    }
                });
            }

            await employee.update({
                name: name || employee.name,
                department: department || employee.department,
                designation: designation || employee.designation,
                project: project || employee.project,
                type: type || employee.type,
                status: status || employee.status,
                image: newImagePath || employee.image
            });

            res.status(200).json({ success: true, message: `Employee with ID ${id} updated successfully`, data: employee });
        } else {
            res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating employee', error: error.message });
    }
};


// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (employee) {
            if (employee.image) {
                const imagePath = path.join(__dirname, '..', employee.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    }
                });
            }

            await employee.destroy();
            res.status(200).json({ success: true, message: `Employee with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting employee', error: error.message });
    }
};
