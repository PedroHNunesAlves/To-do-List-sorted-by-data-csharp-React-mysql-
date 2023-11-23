using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class LembretesController : ControllerBase
{
    private readonly AppDbContext _context;

    public LembretesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Lembretes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Lembrete>>> GetLembretes()
    {
        return await _context.Lembretes.OrderBy(l => l.Data).ToListAsync();
    }

    // POST: api/Lembretes
    [HttpPost]
    public async Task<ActionResult<Lembrete>> PostLembrete(Lembrete lembrete)
    {
        _context.Lembretes.Add(lembrete);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLembretes), new { id = lembrete.Id }, lembrete);
    }
}