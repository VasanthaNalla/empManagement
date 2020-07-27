using EmpManagement.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Services
{
    public class EmployeeService : IEmpService
    {
        public DataProvider Db { get; set; }
        public EmployeeService(DataProvider db)
        {
            Db = db;
        }
        public async Task<List<Employee>> GetAll()
        {
            try
            {
                return  Db.Employees.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Employee GetById(int id)
        {
            try
            {
                return  Db.Employees.Where(c=>c.Id==id).FirstOrDefault(); 
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Employee> Delete(int id)
        {
            try
            {
                var employee = await Db.Employees.FindAsync(id);
                Db.Employees.Remove(employee);
                await Db.SaveChangesAsync();
                return employee;
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<Employee> Update(Employee emp, int id)
        {
            try
            {

                var employee = Db.Employees.Find(id);
                if (employee == null)
                    return null;

                Db.Update(employee);
                await Db.SaveChangesAsync();

                return employee;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<Employee> Add(Employee emp)
        {
            try
            {
                if (emp == null)
                {
                    return null;
                }
               
                Db.Add(emp);
              await  Db.SaveChangesAsync();

                return emp;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
