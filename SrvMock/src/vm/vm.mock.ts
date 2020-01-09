export class MockData{

    static wsData = [{ name: "AuthMng", responses: [], apis: [{ name: "LogIn", errs: [] }, { name: "LogOut", errs: [] }] },
    { name: "ClientMng", responses: [], apis: [{ name: "Create", errs: [] }, { name: "Edit", errs: [] }, { name: "Del", errs: [] }] },
    { name: "MailMng", responses: [], apis: [{ name: "Send", errs: [] }, { name: "Check", errs: [] }] },
    { name: "Analitic", responses: [], apis: [{ name: "GetAll", errs: [] }, { name: "GetErr", errs: [] }, { name: "GetServ", errs: [] }, { name: "GetResp", errs: [] }] }];

    static vmData = [
        {
            name: 'Srv1', vms: [
                { name: "vm1", data: [{ cpuUsage: 100, memUsage: 25 }, { cpuUsage: 95, memUsage: 35 }, { cpuUsage: 55, memUsage: 45 }] },
                { name: "vm2", data: [{ cpuUsage: 50, memUsage: 45 }, { cpuUsage: 55, memUsage: 45 }, { cpuUsage: 70, memUsage: 60 }] }
            ]
        },
        {
            name: 'Srv2', vms: [
                { name: "vm1", data: [{ cpuUsage: 20, memUsage: 35 }, { cpuUsage: 25, memUsage: 45 }, { cpuUsage: 75, memUsage: 80 }] },
                { name: "vm2", data: [{ cpuUsage: 99, memUsage: 75 }, { cpuUsage: 90, memUsage: 70 }, { cpuUsage: 95, memUsage: 30 }] }
            ]
        },
        {
            name: 'Srv3', vms: [
                { name: "vm1", data: [{ cpuUsage: 33, memUsage: 15 }, { cpuUsage: 75, memUsage: 45 }, { cpuUsage: 15, memUsage: 22 }] },
                { name: "vm2", data: [{ cpuUsage: 39, memUsage: 41 }, { cpuUsage: 75, memUsage: 70 }, { cpuUsage: 55, memUsage: 44 }] }
            ]
        }
    ];
    static newSrv = {
        name: 'Srv4', vms: [
            { name: "vm3", data: [{ cpuUsage: 33, memUsage: 15 }, { cpuUsage: 15, memUsage: 22 }, { cpuUsage: 75, memUsage: 45 }] },
            { name: "vm5", data: [{ cpuUsage: 41, memUsage: 39 }, { cpuUsage: 55, memUsage: 44 }, { cpuUsage: 75, memUsage: 70 }] }
        ]
    };
}