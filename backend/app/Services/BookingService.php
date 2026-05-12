<?php

namespace App\Services;

use App\Models\Booking;
use App\Repositories\Contracts\BookingRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BookingService
{
    public function __construct(
        private readonly BookingRepositoryInterface $bookingRepository
    ) {}

    public function getByRoom(int $roomId): Collection
    {
        return $this->bookingRepository->getByRoomId($roomId);
    }

    public function create(array $data): Booking
    {
        $overlaps = $this->bookingRepository->hasOverlap(
            $data['room_id'],
            $data['start_time'],
            $data['end_time']
        );

        if ($overlaps) {
            throw new HttpException(409, 'The selected time slot is already booked.');
        }

        return $this->bookingRepository->create($data);
    }

    public function delete(int $id): void
    {
        $this->bookingRepository->delete($id);
    }
}
