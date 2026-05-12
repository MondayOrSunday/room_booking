<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Http\Resources\RoomResource;
use App\Services\BookingService;
use App\Services\RoomService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomController extends Controller
{
    public function __construct(
        private readonly RoomService $roomService,
        private readonly BookingService $bookingService
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $page = max(1, (int) $request->query('page', 1));
        $perPage = min(50, max(1, (int) $request->query('perPage', 10)));

        return RoomResource::collection(
            $this->roomService->getPaginatedRooms($page, $perPage)
        );
    }

    public function bookings(int $id): AnonymousResourceCollection
    {
        return BookingResource::collection($this->bookingService->getByRoom($id));
    }
}
