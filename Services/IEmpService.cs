using EmpManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpManagement.Services
{
    public interface IEmpService
    {
        Task<Employee> Add(Employee company);
        Employee Update(Employee cm);
        Task<Employee> Delete(int id);
        Task<List<Employee>> GetAll();
        //Task<Employee> GetById(int id);
        Employee GetById(int id);
    }
}
