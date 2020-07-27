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
        Task<Employee> Update(Employee cm, int id);
        Task<Employee> Delete(int id);
        Task<List<Employee>> GetAll();
        Employee GetById(int id);
    }
}
