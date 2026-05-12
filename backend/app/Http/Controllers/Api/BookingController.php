<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Http\Resources\BookingResource;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class BookingController extends Controller
{
    public function __construct(
        private readonly BookingService $bookingService
    ) {}

    public function store(CreateBookingRequest $request): BookingResource
    {
        $booking = $this->bookingService->create($request->validated());

        return new BookingResource($booking);
    }

    public function destroy(int $id): Response
    {
        $this->bookingService->delete($id);

        return response()->noContent();
    }
}
