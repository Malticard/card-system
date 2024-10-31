export class DashboardController {
    async static getStats(req: Request, res: Response) {
        const users = await User.find();
        return res.status(200).json({
            status: 'success',
            data: users
        });
    }
}