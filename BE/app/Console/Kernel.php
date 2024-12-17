<?php

namespace App\Console;

use App\Jobs\UpdateDeliveredStatusJob;
use App\Jobs\DeleteUnpaidVNPayOrdersJob;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new UpdateDeliveredStatusJob)->everyFiveSeconds();
        $schedule->job(new DeleteUnpaidVNPayOrdersJob)->everyFiveSeconds();
    }


    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
