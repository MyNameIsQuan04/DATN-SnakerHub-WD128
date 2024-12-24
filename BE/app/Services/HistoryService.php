<?php
namespace app\Services;

use App\Models\History;
use Illuminate\Support\Facades\Auth;

class HistoryService 
{
    public static function log($table_name, $record_id, $action, $old_data = null, $new_data = null)
    {
        $dataHistory = [
            'user_id' => Auth::id(),
            'table_name' => $table_name,
            'record_id' => $record_id,
            'action' => $action,
            'old_data' => $old_data,
            'new_data' => $new_data,
        ];

        History::create($dataHistory);
    }
}

