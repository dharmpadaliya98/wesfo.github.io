using AutoMapper;
using Core.Models;
using DataAccess.Data;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace Business.Repository
{
    public class ProductPriceRepository : IProductPriceRepository
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public ProductPriceRepository(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<ProductPriceDTO> Create(ProductPriceDTO objDTO)
        {
            var obj = _mapper.Map<ProductPriceDTO, ProductPrice>(objDTO);

            var addedObj = _db.ProductPrices.Add(obj);
            await _db.SaveChangesAsync();

            return _mapper.Map<ProductPrice, ProductPriceDTO>(addedObj.Entity);
        }

        public async Task<int> Delete(int id)
        {
            var obj = await _db.ProductPrices.FirstOrDefaultAsync(u => u.Id == id);
            if (obj == null) return 0;
            _db.ProductPrices.Remove(obj);
            return await _db.SaveChangesAsync();
        }

        public async Task<ProductPriceDTO> Get(int id)
        {
            var obj = await _db.ProductPrices.FirstOrDefaultAsync(u => u.Id == id);
            return obj != null ? _mapper.Map<ProductPrice, ProductPriceDTO>(obj) : new ProductPriceDTO();
        }

        public async Task<IEnumerable<ProductPriceDTO>> GetAll(int? id = null)
        {
            return _mapper.Map<IEnumerable<ProductPrice>, IEnumerable<ProductPriceDTO>>(id is > 0 ? _db.ProductPrices.Where(u => u.ProductId == id) : _db.ProductPrices);
        }

        public async Task<ProductPriceDTO> Update(ProductPriceDTO objDto)
        {
            var objFromDb = await _db.ProductPrices.FirstOrDefaultAsync(u => u.Id == objDto.Id);
            if (objFromDb == null) return objDto;
            objFromDb.Price = objDto.Price;
            objFromDb.Size = objDto.Size;
            objFromDb.ProductId = objDto.ProductId;
            _db.ProductPrices.Update(objFromDb);
            await _db.SaveChangesAsync();
            return _mapper.Map<ProductPrice, ProductPriceDTO>(objFromDb);

        }
    }
}
