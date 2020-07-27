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
                return Db.Employees.ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        //  public  async Task<Employee> GetById(int id)
        public Employee GetById(int id)
        {
            try
            {
                return Db.Employees.FirstOrDefault(c => c.Id == id);
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

        //public async Task<Employee> Update(Employee emp, int id)
        //{
        //    try
        //    {

        //        var employee = Db.Employees.Find(id);
        //        if (employee == null)
        //            return null;

        //        Db.Update(employee);
        //        // await Db.SaveChangesAsync();
        //        Db.SaveChanges();

        //        return employee;
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}

        public Employee Update(Employee emp)
        {
            try
            {
                var employee = Db.Employees.Find(emp.Id);
                if (employee != null)
                {
                    employee.Name = emp.Name;
                    employee.Location = emp.Location;
                    employee.JobTitle = emp.JobTitle;
                    employee.Contact = emp.Contact;
                    employee.Email = emp.Email;
                    Db.Update(employee);
                    // await Db.SaveChangesAsync();
                    Db.SaveChanges();
                }


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
                await Db.SaveChangesAsync();

                return emp;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
