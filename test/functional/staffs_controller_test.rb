require 'test_helper'

class StaffsControllerTest < ActionController::TestCase
  def test_should_get_index
    get :index
    assert_response :success
    assert_not_nil assigns(:staffs)
  end

  def test_should_get_new
    get :new
    assert_response :success
  end

  def test_should_create_staff
    assert_difference('Staff.count') do
      post :create, :staff => { }
    end

    assert_redirected_to staff_path(assigns(:staff))
  end

  def test_should_show_staff
    get :show, :id => staffs(:one).id
    assert_response :success
  end

  def test_should_get_edit
    get :edit, :id => staffs(:one).id
    assert_response :success
  end

  def test_should_update_staff
    put :update, :id => staffs(:one).id, :staff => { }
    assert_redirected_to staff_path(assigns(:staff))
  end

  def test_should_destroy_staff
    assert_difference('Staff.count', -1) do
      delete :destroy, :id => staffs(:one).id
    end

    assert_redirected_to staffs_path
  end
end
