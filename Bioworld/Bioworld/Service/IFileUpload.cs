using Microsoft.AspNetCore.Components.Forms;

namespace Bioworld.Service
{
    public interface IFileUpload
    {
        Task<string> UploadFile(IBrowserFile file);

        bool DeleteFile(string filePath);
    }
}
