using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmpManagement.Models;
using EmpManagement.Services;
using Microsoft.AspNetCore.Authorization;

namespace EmpManagement.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmpService EmployeeService { get; set; }

        public EmployeeController(IEmpService employeeService)
        {
            EmployeeService = employeeService;

        }

        // GET 
        [Authorize]
        [HttpGet("{id}")]
        public  Employee Get(int id)
        {
            return EmployeeService.GetById(id);
        }

        // GET All
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAll()
        {
            return Ok(await EmployeeService.GetAll());
        }


        // POST 
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee emp)
        {
            return Ok(await EmployeeService.Add(emp));

        }

        // PUT api/<ValuesController>/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Employee cm)
        {
            return Ok(await EmployeeService.Update(cm, id));

        }

        // DELETE api/<ValuesController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await EmployeeService.Delete(id));
        }
    }
}



