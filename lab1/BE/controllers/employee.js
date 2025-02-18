const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = employee.findIndex(emp => emp.id === id);
    if (index !== -1) {
      employee.splice(index, 1);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (id && name) {
      if (!employee.find(emp => emp.id === id)) {
        let newEmployee = { id, name };
        employee.push(newEmployee);
        res.status(201).json({ message: 'Employee created successfully' });
      } else {
        res.status(400).json({ message: 'Employee already exists' });
      }
    } else {
      res.status(400).json({ message: 'Invalid employee data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
