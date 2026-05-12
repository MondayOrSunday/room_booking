<?php

namespace App\Repositories\Contracts;

use App\Models\Room;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface RoomRepositoryInterface
{
    public function all(): Collection;

    public function findById(int $id): Room;

    public function paginated(int $page, int $perPage): LengthAwarePaginator;
}
