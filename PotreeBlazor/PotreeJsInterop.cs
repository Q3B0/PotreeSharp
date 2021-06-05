using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace PotreeBlazor
{
    // This class provides an example of how JavaScript functionality can be wrapped
    // in a .NET class for easy consumption. The associated JavaScript module is
    // loaded on demand when first needed.
    //
    // This class can be registered as scoped DI service and then injected into Blazor
    // components for use.

    public class PotreeJsInterop : IAsyncDisposable
    {
        private readonly Lazy<Task<IJSObjectReference>> moduleTask;

        public PotreeJsInterop(IJSRuntime jsRuntime)
        {
            moduleTask = new(() => jsRuntime.InvokeAsync<IJSObjectReference>(
               "import", "./_content/PotreeBlazor/potree_blazor.js").AsTask());
        }

        public async ValueTask<object> Init(string url,int ratio,string direction)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("init_potree", url,ratio,direction);
        }

        public async ValueTask<object> Translate(string axis,double distance)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("translate", axis,distance);
        }
        public async ValueTask<object> TranslateWorld(string axis, double distance)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("translateWorld", axis, distance);
        }
        public async ValueTask<object> SetView(string view)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("setView", view);
        }
        public async ValueTask<object> Zoom(int ratio)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<object>("zoom", ratio);
        }
        public async ValueTask<string> Prompt(string message)
        {
            var module = await moduleTask.Value;
            return await module.InvokeAsync<string>("showPrompt", message);
        }

        public async ValueTask DisposeAsync()
        {
            if (moduleTask.IsValueCreated)
            {
                var module = await moduleTask.Value;
                await module.DisposeAsync();
            }
        }
    }
}
