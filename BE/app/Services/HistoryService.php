<?php
namespace App\Services;

use App\Models\History;
use Illuminate\Support\Facades\Auth;

class HistoryService
{
    public static function log($table_name, $record_id, $action, $old_data, $new_data)
    {
        $dataHistory = [
            'user_id' => Auth::id(),
            'table_name' => $table_name,
            'record_id' => $record_id,
            'action' => $action,
            'old_data' => json_encode($old_data),
            'new_data' => json_encode($new_data),
        ];

        History::create($dataHistory);
    }
}

