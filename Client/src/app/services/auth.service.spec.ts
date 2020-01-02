import { TestBed } from '@angular/core/testing';

import  AuthService  from './auth.service';

describe('TrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('getToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should getToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.getToken()).toEqual('anothertoken');
  });

  it('setToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should setToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(localStorage.setToken()).toEqual('sometoken');
  });

  it('removeToken', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});